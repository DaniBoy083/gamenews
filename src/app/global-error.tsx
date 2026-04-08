"use client";

import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  useEffect(() => {
    toast.error("Ocorreu um erro inesperado na aplicacao.");
  }, []);

  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
        <main className="flex min-h-full items-center px-4 py-16">
          <section className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-zinc-200 bg-white text-center shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950">
            <div className="bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.2),transparent_58%)] px-6 py-14 sm:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-red-200 bg-red-50 text-3xl font-black text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                !
              </div>
              <span className="mt-5 inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                Falha inesperada
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
                Algo saiu do esperado.
              </h1>
              <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:text-lg">
                O aplicativo encontrou um erro ao renderizar esta pagina. Tente
                novamente ou volte para uma area segura da aplicacao.
              </p>

              {error.digest ? (
                <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Codigo do erro: {error.digest}
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() => unstable_retry()}
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
          </section>
        </main>
      </body>
    </html>
  );
}