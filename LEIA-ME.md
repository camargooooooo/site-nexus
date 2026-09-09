# Módulo de orçamento — Nexo Sistemas

## Onde colocar cada arquivo

Copie mantendo a estrutura, a partir da raiz do projeto `site-nexus`:

```
lib/orcamento-schema.ts
components/orcamento-form.tsx
app/orcamento/page.tsx
app/api/orcamento/route.ts
```

## Dependências

```powershell
npx shadcn@latest add form input textarea select checkbox button label sonner
npm i resend motion
```

## Variável de ambiente

Crie `.env.local` na raiz:

```
RESEND_API_KEY=re_sua_chave_aqui
```

Confira se `.env.local` está no `.gitignore`. Essa chave nunca vai para o GitHub.
Na Vercel, cadastre a mesma variável em Settings → Environment Variables.

## Toaster

O `sonner` precisa estar montado uma vez em `app/layout.tsx`:

```tsx
import { Toaster } from "@/components/ui/sonner";

// dentro do <body>, depois de {children}
<Toaster position="top-center" richColors />
```

## Fonte dos títulos

O formulário usa `var(--font-archivo)`. Em `app/layout.tsx`:

```tsx
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

// no <html>: className={archivo.variable}
```

Se você ainda não configurou a fonte, o texto cai na fonte padrão sem quebrar nada.

## Antes de publicar

- Troque os dois números `5514999999999` / `(14) 99999-9999` pelo seu WhatsApp real
  (em `app/orcamento/page.tsx` e `components/orcamento-form.tsx`).
- Enquanto o domínio não estiver verificado no Resend, o remetente tem que ser
  `onboarding@resend.dev` e o destinatário só pode ser o e-mail da sua conta Resend.
  Depois de verificar `nexosistemas.com.br`, troque `REMETENTE` em
  `app/api/orcamento/route.ts` para `orcamento@nexosistemas.com.br`.

## Teste

```powershell
npm run dev
```

Abra `localhost:3000/orcamento`, envie um pedido e confira a caixa de entrada.
Se der erro, olhe o terminal: a rota registra o motivo real no console e devolve
mensagem genérica para o visitante.
