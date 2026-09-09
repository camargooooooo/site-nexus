import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  MODULOS,
  TAMANHOS_CATALOGO,
  orcamentoSchema,
} from "@/lib/orcamento-schema";

const DESTINATARIO = "nnexosistemas@gmail.com";
const REMETENTE = "Site Nexo <onboarding@resend.dev>";

// Limite simples por IP: 3 envios a cada 10 minutos.
const janela = 10 * 60 * 1000;
const limite = 3;
const registros = new Map<string, { contagem: number; expira: number }>();

function excedeuLimite(ip: string) {
  const agora = Date.now();
  const atual = registros.get(ip);

  if (!atual || agora > atual.expira) {
    registros.set(ip, { contagem: 1, expira: agora + janela });
    return false;
  }

  atual.contagem += 1;
  return atual.contagem > limite;
}

function escapar(texto: string) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const chave = process.env.RESEND_API_KEY;
  if (!chave) {
    console.error("RESEND_API_KEY não configurada.");
    return NextResponse.json(
      { erro: "Envio indisponível no momento." },
      { status: 500 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";

  if (excedeuLimite(ip)) {
    return NextResponse.json(
      { erro: "Muitos envios seguidos. Tente de novo em alguns minutos." },
      { status: 429 },
    );
  }

  let corpo: unknown;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "Dados inválidos." }, { status: 400 });
  }

  const analise = orcamentoSchema.safeParse(corpo);
  if (!analise.success) {
    return NextResponse.json(
      { erro: "Confira os campos e envie de novo." },
      { status: 400 },
    );
  }

  const dados = analise.data;

  // Isca preenchida: é robô. Responde sucesso para não avisar o atacante.
  if (dados.site) {
    return NextResponse.json({ ok: true });
  }

  const catalogo =
    TAMANHOS_CATALOGO.find((item) => item.value === dados.catalogo)?.label ??
    dados.catalogo;

  const modulos = dados.modulos
    .map((id) => MODULOS.find((modulo) => modulo.id === id)?.label ?? id)
    .map((label) => `<li>${escapar(label)}</li>`)
    .join("");

  const linha = (rotulo: string, valor: string) =>
    `<tr>
      <td style="padding:6px 16px 6px 0;color:#5A6B82;white-space:nowrap;">${rotulo}</td>
      <td style="padding:6px 0;color:#17355E;font-weight:600;">${escapar(valor)}</td>
    </tr>`;

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:600px;">
    <p style="margin:0 0 20px;font-size:18px;color:#17355E;font-weight:700;">
      Novo pedido de orçamento
    </p>
    <table style="border-collapse:collapse;font-size:15px;">
      ${linha("Nome", dados.nome)}
      ${linha("Negócio", dados.adega)}
      ${linha("Cidade", dados.cidade)}
      ${linha("WhatsApp", dados.whatsapp)}
      ${linha("E-mail", dados.email)}
      ${linha("Catálogo", catalogo)}
    </table>
    <p style="margin:24px 0 6px;color:#5A6B82;font-size:15px;">Módulos de interesse</p>
    <ul style="margin:0;padding-left:20px;color:#17355E;font-size:15px;">${modulos}</ul>
    ${
      dados.mensagem
        ? `<p style="margin:24px 0 6px;color:#5A6B82;font-size:15px;">Mensagem</p>
           <p style="margin:0;color:#17355E;font-size:15px;white-space:pre-wrap;">${escapar(
             dados.mensagem,
           )}</p>`
        : ""
    }
    <p style="margin:28px 0 0;">
      <a href="https://wa.me/55${dados.whatsapp.replace(/\D/g, "")}"
         style="color:#1B9A66;font-weight:600;">Responder no WhatsApp</a>
    </p>
  </div>`;

  try {
    const resend = new Resend(chave);
    const { error } = await resend.emails.send({
      from: REMETENTE,
      to: DESTINATARIO,
      replyTo: dados.email,
      subject: `Orçamento — ${dados.adega} (${dados.cidade})`,
      html,
    });

    if (error) {
      console.error("Resend recusou o envio:", error);
      return NextResponse.json(
        { erro: "Não consegui enviar agora." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (erro) {
    console.error("Falha ao enviar orçamento:", erro);
    return NextResponse.json({ erro: "Não consegui enviar agora." }, { status: 500 });
  }
}
