"use client";

import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

type GamesErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GamesErrorPage({ error, reset }: GamesErrorPageProps) {
  useEffect(() => {
    toast.error("Nao foi possivel carregar a area de games.");
  }, []);

  return (
    <section className="min-h-full bg-zinc-50 px-4 py-16 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center overflow-hidden rounded-3xl border border-zinc-200 bg-white text-center shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950">
        <div
          className="w-full px-6 py-14 sm:px-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at top, rgba(220, 38, 38, 0.18), transparent 58%)",
          }}
        >
          <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            Falha em games
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            A listagem encontrou um erro.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:mx-auto sm:text-lg">
            Nao conseguimos abrir a area de games neste momento. Voce pode
            tentar recarregar a secao ou voltar para outra parte do site.
          </p>

          {error.digest ? (
            <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Codigo do erro: {error.digest}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Tentar novamente
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              Voltar para home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}