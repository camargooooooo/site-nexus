import { Ficha } from "@/components/site/ficha";

const RECURSOS = [
  { nome: "PDV", texto: "Venda com leitor de código de barras." },
  { nome: "Controle de estoque", texto: "Loja e depósito separados, com validade." },
  { nome: "Fiado", texto: "Pagamento parcial, tudo registrado." },
  { nome: "Caixa diário", texto: "Abertura, vendas e fechamento do dia." },
  { nome: "Contas a pagar", texto: "O que ainda falta pagar, num lugar só." },
  { nome: "Relatórios", texto: "Exportação em PDF e Excel." },
  { nome: "Operação offline", texto: "Funciona 100% sem internet." },
];

const LINHAS = [
  { rotulo: "Desenvolvimento", valor: "Sob medida para o seu negócio" },
  { rotulo: "Instalação", valor: "Simples" },
  { rotulo: "Treinamento", valor: "Incluso, conforme o plano" },
  { rotulo: "Suporte", valor: "Disponível" },
  { rotulo: "Operação offline", valor: "Sim, modo offline completo" },
  { rotulo: "Requisito de máquina", valor: "Qualquer computador com internet" },
];

export function FichaTecnica() {
  return (
    <Ficha
      id="sec-06"
      titulo="Especificações."
      rotuloRecursos="O que tem dentro"
      recursos={RECURSOS}
      rotuloLinhas="Ficha técnica"
      linhas={LINHAS}
    />
  );
}
