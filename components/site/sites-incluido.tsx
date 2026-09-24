import { Ficha } from "@/components/site/ficha";

const RECURSOS = [
  { nome: "Design exclusivo", texto: "Pensado para a sua marca, não um template pronto." },
  { nome: "Responsivo", texto: "Funciona bem em celular, tablet e computador." },
  { nome: "Formulário de contato", texto: "Pedidos e mensagens chegam direto no seu e-mail." },
  { nome: "Otimização básica para Google", texto: "Estrutura pensada para aparecer nas buscas." },
  { nome: "Domínio e hospedagem", texto: "Deixamos o site no ar, no seu domínio." },
  { nome: "Suporte após a entrega", texto: "Ajuste pontual depois que o site vai ao ar." },
];

const LINHAS = [
  { rotulo: "Prazo de entrega", valor: "Combinado antes de começar" },
  { rotulo: "Revisões inclusas", valor: "Conforme o plano" },
  { rotulo: "Hospedagem", valor: "Configurada e entregue" },
  { rotulo: "Domínio", valor: "Configurado no seu nome" },
  { rotulo: "Suporte", valor: "Disponível após a entrega" },
];

export function SitesIncluido() {
  return (
    <Ficha
      id="incluido"
      titulo="O que está incluído."
      rotuloRecursos="No pacote"
      recursos={RECURSOS}
      rotuloLinhas="Condições"
      linhas={LINHAS}
    />
  );
}
