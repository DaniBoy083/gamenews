import type { Metadata } from "next";
import { SearchPageClient } from "../../components/SearchPageClient";
import { getGames, getSearchMatches } from "../../lib/games";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const queryValue = Array.isArray(resolvedSearchParams.q)
    ? resolvedSearchParams.q[0]
    : resolvedSearchParams.q;
  const normalizedQuery = queryValue?.trim();

  if (!normalizedQuery) {
    const games = await getGames();
    const featuredGame = games[0];

    return {
      title: "Search",
      description:
        "Use a busca dedicada do Game News para encontrar jogos por nome, categoria, plataforma e termos relacionados.",
      alternates: {
        canonical: "/search",
      },
      openGraph: {
        title: "Busca de jogos | Game News",
        description:
          "Pesquise jogos em tempo real com sugestoes de auto complete e resultados instantaneos.",
        url: "/search",
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
            title: "Busca de jogos | Game News",
            description:
              "Pesquise jogos em tempo real com sugestoes e resultados instantaneos.",
            images: [featuredGame.image_url],
          }
        : undefined,
    };
  }

  const games = await getGames();
  const matches = getSearchMatches(games, normalizedQuery);
  const featuredGame = matches[0] ?? games[0];

  return {
    title: `Search | ${normalizedQuery}`,
    description: `Resultados de busca para ${normalizedQuery} no catalogo Game News.`,
    alternates: {
      canonical: `/search?q=${encodeURIComponent(normalizedQuery)}`,
    },
    openGraph: {
      title: `Busca por ${normalizedQuery} | Game News`,
      description: `Confira os jogos relacionados a ${normalizedQuery} no catalogo Game News.`,
      url: `/search?q=${encodeURIComponent(normalizedQuery)}`,
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
          title: `Busca por ${normalizedQuery} | Game News`,
          description: `Confira os jogos relacionados a ${normalizedQuery} no catalogo Game News.`,
          images: [featuredGame.image_url],
        }
      : undefined,
  };
}

export default function SearchPage() {
  return (
    <section className="min-h-full bg-zinc-50 px-4 py-16 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            Search ao vivo
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Pesquise e veja a pagina atualizar enquanto digita.
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
            Esta rota foi feita para busca dedicada, com sugestoes de auto
            complete e resultados que acompanham o termo digitado em tempo real.
          </p>
        </div>

        <SearchPageClient />
      </div>
    </section>
  );
}