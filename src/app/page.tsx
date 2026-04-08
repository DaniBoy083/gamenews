
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDailyGame } from "../lib/games";

const imageSizeRules = [
  { media: "(max-width: 640px)", size: "100vw" },
  { media: "(max-width: 1024px)", size: "92vw" },
  { media: "(max-width: 1280px)", size: "56vw" },
];

function getResponsiveImageSizes() {
  return [...imageSizeRules.map(({ media, size }) => `${media} ${size}`), "48vw"].join(
    ", ",
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const dailyGame = await getDailyGame();

  if (!dailyGame) {
    return {
      title: "Home",
      description:
        "Descubra um jogo diferente por dia e acompanhe os destaques mais recentes do catalogo Game News.",
      alternates: {
        canonical: "/",
      },
      openGraph: {
        title: "Game News | Jogo em destaque do dia",
        description:
          "Veja o destaque do dia e navegue pelo catalogo de jogos com filtros e busca em tempo real.",
        url: "/",
      },
    };
  }

  return {
    title: `Home | ${dailyGame.title} em destaque`,
    description: dailyGame.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: `${dailyGame.title} em destaque no Game News`,
      description: dailyGame.description,
      url: "/",
      images: [
        {
          url: dailyGame.image_url,
          alt: `Capa do jogo ${dailyGame.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dailyGame.title} em destaque no Game News`,
      description: dailyGame.description,
      images: [dailyGame.image_url],
    },
  };
}

export default async function Home() {
  const dailyGame = await getDailyGame();
  const imageSizes = getResponsiveImageSizes();

  return (
    <section className="min-h-full bg-zinc-50 px-4 py-16 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex w-fit rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            Sugestão em destaque
          </span>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Descubra um jogo diferente para conhecer hoje.
          </h1>
          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
            A home agora consulta uma API externa e destaca um game em rotação
            frequente para você explorar.
          </p>
        </div>

        {dailyGame ? (
          <article className="group grid overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative aspect-4/3 min-h-64 bg-zinc-200 dark:bg-zinc-900 sm:aspect-16/10 sm:min-h-80 lg:aspect-auto lg:min-h-135">
              <Image
                src={dailyGame.image_url}
                alt={`Capa do jogo ${dailyGame.title}`}
                fill
                priority
                sizes={imageSizes}
                className="object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent opacity-90 transition-opacity duration-700 ease-out group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/70">
                  Game News Picks
                </p>
                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                  {dailyGame.title}
                </h2>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
                  {dailyGame.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                      Categorias
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {dailyGame.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                      Plataformas
                    </p>
                    <p className="mt-2 text-base text-zinc-700 dark:text-zinc-300">
                      {dailyGame.platforms.join(" • ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 border-t border-zinc-200 pt-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    Lançamento
                  </p>
                  <p className="mt-1 text-lg font-semibold">{dailyGame.release}</p>
                </div>
                <Link
                  href="/games"
                  className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500 sm:w-auto"
                >
                  Ver mais games
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
            Não foi possível carregar a sugestão do dia agora. Tente novamente
            em instantes.
          </div>
        )}
      </div>
    </section>
  );
}
