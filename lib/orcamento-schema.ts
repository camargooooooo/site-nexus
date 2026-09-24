import { z } from "zod";

export const TAMANHOS_CATALOGO = [
  { value: "ate-300", label: "Até 300 produtos" },
  { value: "300-1000", label: "De 300 a 1.000 produtos" },
  { value: "mais-1000", label: "Mais de 1.000 produtos" },
] as const;

export const MODULOS = [
  { id: "pdv", label: "Frente de caixa com leitor de código de barras" },
  { id: "estoque", label: "Estoque separado entre loja e depósito" },
  { id: "fiado", label: "Fiado com pagamento parcial" },
  { id: "financeiro", label: "Caixa diário e contas a pagar" },
  { id: "relatorios", label: "Relatórios em PDF e Excel" },
  { id: "cadastros", label: "Clientes e fornecedores" },
] as const;

const IDS_MODULOS = MODULOS.map((modulo) => modulo.id) as [
  (typeof MODULOS)[number]["id"],
  ...(typeof MODULOS)[number]["id"][],
];

// Campos de uma linha só: nada de quebra de linha nem caracteres de controle
// (evita injeção no assunto do e-mail e lixo invisível).
const SEM_CONTROLE = /^[^\u0000-\u001f\u007f]*$/u;

function linhaUnica(min: number, max: number, vazio: string, longo: string) {
  return z
    .string()
    .trim()
    .min(min, vazio)
    .max(max, longo)
    .regex(SEM_CONTROLE, "Use só texto simples, sem quebras de linha.");
}

// .strict() recusa qualquer campo extra enviado (bloqueia mass assignment).
export const orcamentoSchema = z
  .object({
    nome: linhaUnica(2, 80, "Escreva seu nome completo.", "Nome muito longo."),
    adega: linhaUnica(2, 80, "Escreva o nome do negócio.", "Nome muito longo."),
    cidade: linhaUnica(2, 80, "Escreva a cidade e o estado.", "Texto muito longo."),
    email: z
      .string()
      .trim()
      .min(1, "Escreva um e-mail para eu responder.")
      .max(120, "E-mail muito longo.")
      .email("Esse e-mail não parece válido. Confira antes de enviar."),
    whatsapp: z
      .string()
      .trim()
      .max(20, "Número muito longo.")
      .refine((valor) => {
        const digitos = valor.replace(/\D/g, "").length;
        return digitos >= 10 && digitos <= 11;
      }, "Escreva o WhatsApp com DDD."),
    catalogo: z.enum(["ate-300", "300-1000", "mais-1000"], {
      message: "Escolha o tamanho do catálogo.",
    }),
    modulos: z
      .array(z.enum(IDS_MODULOS))
      .min(1, "Marque pelo menos um módulo.")
      .max(MODULOS.length),
    mensagem: z.string().trim().max(1500, "Máximo de 1.500 caracteres.").optional(),
    // Campo isca: fica escondido e sempre vazio para uma pessoa real.
    site: z.string().max(200).optional(),
  })
  .strict();

export type OrcamentoInput = z.infer<typeof orcamentoSchema>;

export function formatarWhatsapp(valor: string) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10)
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}
