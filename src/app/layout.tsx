import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "../components/AppProviders";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Game News | Noticias, catalogo e busca de jogos",
    template: "%s | Game News",
  },
  description:
    "Portal de games com destaque diario, catalogo filtravel, pagina de detalhes e busca em tempo real para descobrir jogos.",
  keywords: [
    "game news",
    "notícias de games",
    "fórum de games",
    "jogos",
    "games",
    "gamer",
    "pc games",
    "playstation",
    "xbox",
    "nintendo",
    "esports",
    "reviews de jogos",
    "lançamentos de games",
    "comunidade gamer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Game News | Noticias, catalogo e busca de jogos",
    description:
      "Acompanhe destaques de jogos, navegue por um catalogo conectado com API e encontre titulos com busca em tempo real.",
    url: "/",
    siteName: "Game News",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/assets/favicon.png",
        width: 512,
        height: 512,
        alt: "Logo do Game News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Game News | Noticias, catalogo e busca de jogos",
    description:
      "Explore jogos em destaque, listagem filtravel e paginas de detalhes no Game News.",
    images: ["/assets/favicon.png"],
  },
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
  category: "games",
};

/**
 * Layout raiz da aplicação.
 * Centraliza a composição de Header, conteúdo da página e Footer.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
