import type { Metadata } from "next";
import { Archivo, Figtree } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AvisoCookies } from "@/components/site/aviso-cookies";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexo Sistemas",
  description:
    "Sistemas de gestão sob medida para pequenos negócios. PDV, estoque, fiado e caixa, feitos do jeito que o seu negócio já funciona.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${figtree.variable}`}>
      <body className="font-corpo antialiased">
        {children}
        <AvisoCookies />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
