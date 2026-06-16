import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rossano Miniaturas | Miniaturas Automotivas Colecionáveis 1:64",
    template: "%s | Rossano Miniaturas",
  },
  description:
    "Loja premium de miniaturas automotivas colecionáveis na escala 1:64. Hot Wheels, Mini GT, Kaido House, Inno64, Tarmac Works e muito mais. Sua coleção merece o extraordinário.",
  keywords: [
    "miniaturas",
    "diecast",
    "1:64",
    "Hot Wheels",
    "Mini GT",
    "colecionáveis",
    "carros miniatura",
    "Kaido House",
    "Inno64",
    "Tarmac Works",
  ],
  openGraph: {
    title: "Rossano Miniaturas | Miniaturas Automotivas Colecionáveis 1:64",
    description:
      "Loja premium de miniaturas automotivas colecionáveis na escala 1:64. Sua coleção merece o extraordinário.",
    type: "website",
    locale: "pt_BR",
    siteName: "Rossano Miniaturas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${outfit.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary font-sans">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
