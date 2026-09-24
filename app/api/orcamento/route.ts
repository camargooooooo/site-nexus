import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkBotId } from "botid/server";

import {
  MODULOS,
  TAMANHOS_CATALOGO,
  orcamentoSchema,
} from "@/lib/orcamento-schema";

const DESTINATARIO = "nnexosistemas@gmail.com";
const REMETENTE = "Site Nexo <onboarding@resend.dev>";

// Corpo máximo aceito: o formulário real fica bem abaixo de 4 KB.
const TAMANHO_MAXIMO = 10 * 1024;

// Limite por IP: 3 envios a cada 10 minutos. Fica em memória por instância;
// na Vercel, some a isso uma regra de rate limit no Firewall (ver LEIA-ME).
const janela = 10 * 60 * 1000;
const limite = 3;
const MAX_REGISTROS = 5000;
const registros = new Map<string, { contagem: number; expira: number }>();

function limparExpirados(agora: number) {
  for (const [ip, registro] of registros) {
    if (agora > registro.expira) registros.delete(ip);
  }
  // Se ainda estiver cheio (ataque distribuído), descarta os mais antigos.
  while (registros.size >= MAX_REGISTROS) {
    const primeiro = registros.keys().next().value;
    if (primeiro === undefined) break;
    registros.delete(primeiro);
  }
}

function excedeuLimite(ip: string) {
  const agora = Date.now();
  const atual = registros.get(ip);

  if (!atual || agora > atual.expira) {
    if (registros.size >= MAX_REGISTROS) limparExpirados(agora);
    registros.set(ip, { contagem: 1, expira: agora + janela });
    return false;
  }

  atual.contagem += 1;
  return atual.contagem > limite;
}

function ipDoCliente(request: Request) {
  // Na Vercel, x-real-ip é definido pela plataforma e não pode ser forjado pelo cliente.
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "desconhecido"
  );
}

function mesmaOrigem(request: Request) {
  const origem = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origem || !host) return false;
  try {
    return new URL(origem).host === host;
  } catch {
    return false;
  }
}

// BotID só existe dentro da Vercel. Se o serviço falhar, registra e segue:
// o campo isca e o limite por IP continuam barrando robôs, e nenhum pedido real se perde.
async function ehRobo() {
  if (!process.env.VERCEL) return false;
  try {
    const verificacao = await checkBotId();
    return verificacao.isBot;
  } catch (erro) {
    console.error("BotID indisponível:", erro instanceof Error ? erro.message : "erro desconhecido");
    return false;
  }
}

// Respostas curtas e sem cache: nunca devolvem dados internos nem detalhes de erro.
function responder(corpo: { ok: true } | { erro: string }, status = 200) {
  return NextResponse.json(corpo, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function escapar(texto: string) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  if (!mesmaOrigem(request)) {
    return responder({ erro: "Origem não permitida." }, 403);
  }

  const tipo = request.headers.get("content-type") ?? "";
  if (!tipo.includes("application/json")) {
    return responder({ erro: "Formato não suportado." }, 415);
  }

  if (await ehRobo()) {
    return responder({ erro: "Acesso negado." }, 403);
  }

  if (excedeuLimite(ipDoCliente(request))) {
    return responder({ erro: "Muitos envios seguidos. Tente de novo em alguns minutos." }, 429);
  }

  const chave = process.env.RESEND_API_KEY;
  if (!chave) {
    console.error("RESEND_API_KEY não configurada.");
    return responder({ erro: "Envio indisponível no momento." }, 500);
  }

  const declarado = Number(request.headers.get("content-length") ?? 0);
  if (declarado > TAMANHO_MAXIMO) {
    return responder({ erro: "Pedido grande demais." }, 413);
  }

  let corpo: unknown;
  try {
    const texto = await request.text();
    if (texto.length > TAMANHO_MAXIMO) {
      return responder({ erro: "Pedido grande demais." }, 413);
    }
    corpo = JSON.parse(texto);
  } catch {
    return responder({ erro: "Dados inválidos." }, 400);
  }

  const analise = orcamentoSchema.safeParse(corpo);
  if (!analise.success) {
    return responder({ erro: "Confira os campos e envie de novo." }, 400);
  }

  const dados = analise.data;

  // Isca preenchida: é robô. Responde sucesso para não avisar o atacante.
  if (dados.site) {
    return responder({ ok: true });
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
      console.error("Resend recusou o envio:", error.name, error.message);
      return responder({ erro: "Não consegui enviar agora." }, 502);
    }

    return responder({ ok: true });
  } catch (erro) {
    console.error("Falha ao enviar orçamento:", erro instanceof Error ? erro.message : "erro desconhecido");
    return responder({ erro: "Não consegui enviar agora." }, 500);
  }
}
