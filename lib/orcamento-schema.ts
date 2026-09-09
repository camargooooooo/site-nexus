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

export const orcamentoSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Escreva seu nome completo.")
    .max(80, "Nome muito longo."),
  adega: z
    .string()
    .trim()
    .min(2, "Escreva o nome do negócio.")
    .max(80, "Nome muito longo."),
  cidade: z
    .string()
    .trim()
    .min(2, "Escreva a cidade e o estado.")
    .max(80, "Texto muito longo."),
  email: z
    .string()
    .trim()
    .min(1, "Escreva um e-mail para eu responder.")
    .email("Esse e-mail não parece válido. Confira antes de enviar."),
  whatsapp: z
    .string()
    .trim()
    .refine(
      (valor) => valor.replace(/\D/g, "").length >= 10,
      "Escreva o WhatsApp com DDD.",
    ),
  catalogo: z.enum(["ate-300", "300-1000", "mais-1000"], {
    message: "Escolha o tamanho do catálogo.",
  }),
  modulos: z.array(z.string()).min(1, "Marque pelo menos um módulo."),
  mensagem: z.string().trim().max(1500, "Máximo de 1.500 caracteres.").optional(),
  // Campo isca: fica escondido e sempre vazio para uma pessoa real.
  site: z.string().max(0).optional(),
});

export type OrcamentoInput = z.infer<typeof orcamentoSchema>;

export function formatarWhatsapp(valor: string) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  if (digitos.length <= 2) return digitos;
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10)
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}
