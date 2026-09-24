import { initBotId } from "botid/client/core";

// Proteção invisível contra robôs no envio do orçamento (Vercel BotID).
initBotId({
  protect: [{ path: "/api/orcamento", method: "POST" }],
});
