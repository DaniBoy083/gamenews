import type { Metadata } from "next";
import { GamesSearch } from "../../components/GamesSearch";
import { getGames } from "../../lib/games";

export async function generateMetadata(): Promise<Metadata> {
  const games = await getGames();
  const featuredGame = games[0];

  return {
    title: "Catalogo de jogos",
    description:
      "Explore o catalogo Game News com filtros por nome, categoria e plataforma, incluindo busca com sugestoes e paginacao.",
    alternates: {
      canonical: "/games",
    },
    openGraph: {
      title: "Catalogo de jogos | Game News",
      description:
        "Pesquise jogos em tempo real, refine por categoria e plataforma e abra a pagina de detalhes de cada titulo.",
      url: "/games",
      images: featuredGame
        ? [
            {
              url: featuredGame.image_url,
              alt: `Capa do jogo ${featuredGame.title}`,
            },
          ]
        : undefined,
    },
    twitter: featuredGame
      ? {
          card: "summary_large_image",
          title: "Catalogo de jogos | Game News",
          description:
            "Explore o catalogo Game News com filtros e paginas de detalhes dos jogos.",
          images: [featuredGame.image_url],
        }
      : undefined,
  };
}

/**
 * Página inicial da seção Games.
 */
export default function GamesPage() {
  return (
    <section className="min-h-full bg-zinc-50 px-4 py-16 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            Catalogo conectado com API
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Pesquise jogos em tempo real.
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
            Digite um termo, refine por categoria e plataforma e navegue pelas
            paginas mantendo os filtros sincronizados com a URL.
          </p>
        </div>

        <GamesSearch />
      </div>
    </section>
  );
}
