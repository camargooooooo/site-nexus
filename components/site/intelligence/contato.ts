// Canais que já existem no site (rodapé e /orcamento). Não inventar outros.
const WHATSAPP = "5514991096832";
export const EMAIL = "nnexosistemas@gmail.com";

export const LINK_DIAGNOSTICO = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Olá! Quero solicitar um diagnóstico da Nexo Intelligence para a minha empresa.",
)}`;

export const LINK_ESPECIALISTA = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Nexo Intelligence: conversar com um especialista",
)}`;
