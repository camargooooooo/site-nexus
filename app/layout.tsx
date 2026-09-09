import type { Metadata } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Grao } from "@/components/site/grao";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
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
    <html lang="pt-BR" className={`${archivo.variable} ${instrumentSans.variable}`}>
      <body className="font-[family-name:var(--font-instrument)] antialiased">
        {children}
        <Grao />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}