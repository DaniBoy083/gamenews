import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-full bg-zinc-50 px-4 py-16 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center overflow-hidden rounded-3xl border border-zinc-200 bg-white text-center shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950">
        <div className="w-full bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_58%)] px-6 py-14 sm:px-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-red-200 bg-red-50 text-3xl font-black text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            404
          </div>
          <span className="mt-5 inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            Erro 404
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Pagina nao encontrada.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300 sm:mx-auto sm:text-lg">
            O conteudo que voce tentou acessar nao existe ou foi movido. Volte
            para a home ou confira a listagem de jogos disponivel agora.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
            >
              Ir para home
            </Link>
            <Link
              href="/games"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
            >
              Ver jogos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}