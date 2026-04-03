import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados globais aplicados em todas as rotas do App Router.
export const metadata: Metadata = {
  title: "Game News",
  description: "Forum de games para gamers",
  keywords: [
    "game news",
    "noticias de games",
    "forum de games",
    "jogos",
    "games",
    "gamer",
    "pc games",
    "playstation",
    "xbox",
    "nintendo",
    "esports",
    "reviews de jogos",
    "lancamentos de games",
    "comunidade gamer",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/favicon.png",
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
};

/**
 * Layout raiz da aplicacao.
 * Centraliza a composicao de Header, conteudo da pagina e Footer.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
