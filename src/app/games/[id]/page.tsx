import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGameById } from "../../../lib/games";

type GameDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const imageSizes = [
  "(max-width: 768px) 100vw",
  "(max-width: 1280px) 92vw",
  "64vw",
].join(", ");

export async function generateMetadata({
  params,
}: GameDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const gameId = Number(id);

  if (!Number.isInteger(gameId) || gameId <= 0) {
    return {
      title: "Jogo nao encontrado",
      description: "O jogo solicitado nao foi localizado no catalogo Game News.",
    };
  }

  const game = await getGameById(gameId);

  if (!game) {
    return {
      title: "Jogo nao encontrado",
      description: "O jogo solicitado nao foi localizado no catalogo Game News.",
    };
  }

  return {
    title: game.title,
    description: game.description,
    alternates: {
      canonical: `/games/${game.id}`,
    },
    openGraph: {
      title: `${game.title} | Game News`,
      description: game.description,
      url: `/games/${game.id}`,
      type: "article",
      images: [
        {
          url: game.image_url,
          alt: `Capa do jogo ${game.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} | Game News`,
      description: game.description,
      images: [game.image_url],
    },
    keywords: [...game.categories, ...game.platforms, game.title],
  };
}

export default async function GameDetailsPage({ params }: GameDetailsPageProps) {
  const { id } = await params;
  const gameId = Number(id);

  if (!Number.isInteger(gameId) || gameId <= 0) {
    notFound();
  }

  const game = await getGameById(gameId);

  if (!game) {
    notFound();
  }

  return (
    <section className="min-h-full bg-zinc-50 px-4 py-16 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
              Detalhe do jogo
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              {game.title}
            </h1>
          </div>

          <Link
            href="/games"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          >
            Voltar para listagem
          </Link>
        </div>

        <article className="grid overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative aspect-4/3 min-h-64 bg-zinc-200 dark:bg-zinc-900 sm:aspect-16/10 sm:min-h-80 lg:aspect-auto lg:min-h-135">
            <Image
              src={game.image_url}
              alt={`Capa do jogo ${game.title}`}
              fill
              priority
              sizes={imageSizes}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
          </div>

          <div className="flex flex-col gap-8 p-6 sm:p-8 lg:p-10">
            <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
              {game.description}
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  Lancamento
                </p>
                <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {game.release}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  Plataformas
                </p>
                <p className="mt-2 text-base text-zinc-700 dark:text-zinc-300">
                  {game.platforms.join(" • ")}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Categorias
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {game.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-200"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}