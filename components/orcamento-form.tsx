"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  MODULOS,
  TAMANHOS_CATALOGO,
  formatarWhatsapp,
  orcamentoSchema,
  type OrcamentoInput,
} from "@/lib/orcamento-schema";

const campo =
  "h-11 rounded-xl border-tinta/15 bg-papel/60 text-base md:text-base text-tinta placeholder:text-tinta/50 transition-colors hover:border-tinta/30 focus-visible:border-cobalto focus-visible:bg-white focus-visible:ring-cobalto/20";

export function OrcamentoForm() {
  const [enviado, setEnviado] = useState(false);
  const reduzirMovimento = useReducedMotion();

  const form = useForm<OrcamentoInput>({
    resolver: zodResolver(orcamentoSchema),
    defaultValues: {
      nome: "",
      adega: "",
      cidade: "",
      email: "",
      whatsapp: "",
      modulos: [],
      mensagem: "",
      site: "",
    },
  });

  async function onSubmit(valores: OrcamentoInput) {
    try {
      const resposta = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valores),
      });

      if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => null);
        throw new Error(corpo?.erro ?? "falha");
      }

      setEnviado(true);
    } catch {
      toast.error("O pedido não foi enviado.", {
        description:
          "Tente de novo em alguns instantes ou chame no WhatsApp (14) 99109-6832.",
      });
    }
  }

  if (enviado) {
    return (
      <motion.div
        initial={reduzirMovimento ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="py-10 text-center"
      >
        <div
          aria-hidden
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-menta"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="var(--tinta)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="titulo mt-6 text-3xl text-tinta">
          Pedido enviado
        </h2>
        <p className="mx-auto mt-3 max-w-[40ch] text-tinta/75">
          Recebi os dados da {form.getValues("adega")}. Respondo no seu WhatsApp
          em até um dia útil.
        </p>
        <Button
          variant="outline"
          className="mt-8 h-11 rounded-full border-tinta/20 px-6 text-tinta hover:bg-papel"
          onClick={() => {
            form.reset();
            setEnviado(false);
          }}
        >
          Enviar outro pedido
        </Button>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7" noValidate>
        {/* Campo isca contra robôs de spam. Invisível e fora da ordem de tabulação. */}
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="site">Não preencha este campo</label>
          <input
            id="site"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("site")}
          />
        </div>

        <div className="grid gap-7 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-tinta">Seu nome</FormLabel>
                <FormControl>
                  <Input placeholder="Gabriel Camargo" className={campo} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="adega"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-tinta">Nome do negócio</FormLabel>
                <FormControl>
                  <Input placeholder="Mercadinho Bom Preço" className={campo} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-tinta">Cidade</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Lençóis Paulista, SP"
                    className={campo}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-tinta">WhatsApp</FormLabel>
                <FormControl>
                  <Input
                    inputMode="tel"
                    placeholder="(14) 99999-9999"
                    className={campo}
                    value={field.value}
                    onChange={(evento) =>
                      field.onChange(formatarWhatsapp(evento.target.value))
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-tinta">E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  inputMode="email"
                  placeholder="voce@exemplo.com"
                  className={campo}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="catalogo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-tinta">
                Quantos produtos você vende hoje
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={`w-full ${campo} data-[size=default]:h-11`}>
                    <SelectValue placeholder="Escolha o tamanho do catálogo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TAMANHOS_CATALOGO.map((opcao) => (
                    <SelectItem key={opcao.value} value={opcao.value}>
                      {opcao.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-tinta/65">
                Um número aproximado já serve.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="modulos"
          render={() => (
            <FormItem>
              <FormLabel className="font-semibold text-tinta">
                O que você mais precisa resolver
              </FormLabel>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {MODULOS.map((modulo) => (
                  <FormField
                    key={modulo.id}
                    control={form.control}
                    name="modulos"
                    render={({ field }) => {
                      const marcado = field.value?.includes(modulo.id);
                      return (
                        <FormItem className="flex items-start gap-3 space-y-0 rounded-xl border border-tinta/12 bg-white p-3.5 transition-colors hover:border-tinta/30 has-[button[data-state=checked]]:border-cobalto has-[button[data-state=checked]]:bg-cobalto/[0.05]">
                          <FormControl>
                            <Checkbox
                              checked={marcado}
                              onCheckedChange={(valor) =>
                                field.onChange(
                                  valor
                                    ? [...(field.value ?? []), modulo.id]
                                    : field.value?.filter((id) => id !== modulo.id),
                                )
                              }
                              className="mt-0.5 border-tinta/30 data-[state=checked]:border-cobalto data-[state=checked]:bg-cobalto"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-medium leading-snug text-tinta">
                            {modulo.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mensagem"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-tinta">
                Mais alguma coisa? (opcional)
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Como você controla o estoque e o fiado hoje, quantos caixas tem na loja, se já usa algum sistema."
                  className={`resize-none ${campo} h-auto min-h-32 py-3`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 border-t border-tinta/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[36ch] text-sm text-tinta/70">
            Seus dados vão só para o meu e-mail. Nada de lista de disparo.
          </p>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="h-12 rounded-full bg-menta px-8 text-base font-bold text-tinta shadow-[0_10px_30px_-10px_rgb(46_232_143/0.8)] hover:bg-[#5cf0a8] focus-visible:ring-cobalto/40 disabled:opacity-70"
          >
            {form.formState.isSubmitting ? "Enviando…" : "Enviar pedido"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
