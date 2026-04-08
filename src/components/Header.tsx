import Link from "next/link";

/**
 * Cabeçalho global com logo, navegação principal e acesso ao perfil.
 */
export function Header() {
  return (
    <header className="w-full border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Bloco esquerdo: marca do site + navegação */}
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-8">
          <div className="flex items-center justify-between gap-4 sm:justify-start">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100"
            >
              Game<span className="text-red-600">News</span>
            </Link>

            <Link
              href="/perfil"
              aria-label="Abrir perfil"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="3.25" />
                <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
              </svg>
            </Link>
          </div>

          <nav className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
            <Link
              href="/games"
              className="rounded-full px-4 py-2 text-center text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              Games
            </Link>
            <Link
              href="/search"
              className="rounded-full px-4 py-2 text-center text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              Search
            </Link>
            <Link
              href="/perfil"
              className="rounded-full px-4 py-2 text-center text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              Perfil
            </Link>
          </nav>
        </div>

        {/* Ação rápida de perfil exibida no lado direito */}
        <Link
          href="/perfil"
          aria-label="Perfil do usuário"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 sm:flex"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="3.25" />
            <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
