import { SearchPageClient } from "../../components/SearchPageClient";

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