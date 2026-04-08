"use client";

import { GameSearchInput } from "./GameSearchInput";

type GamesFiltersProps = {
  query: string;
  selectedCategory: string;
  selectedPlatform: string;
  categories: string[];
  platforms: string[];
  searchSuggestions: string[];
  resultsCount: number;
  totalCount: number;
  onQueryChange: (value: string) => void;
  onSuggestionSelect: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onReset: () => void;
};

const ALL_FILTERS_VALUE = "all";

export function GamesFilters({
  query,
  selectedCategory,
  selectedPlatform,
  categories,
  platforms,
  searchSuggestions,
  resultsCount,
  totalCount,
  onQueryChange,
  onSuggestionSelect,
  onCategoryChange,
  onPlatformChange,
  onReset,
}: GamesFiltersProps) {
  const hasActiveFilters =
    query.trim() !== "" ||
    selectedCategory !== ALL_FILTERS_VALUE ||
    selectedPlatform !== ALL_FILTERS_VALUE;

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full space-y-4">
          <GameSearchInput
            id="games-search"
            label="Filtrar jogos"
            query={query}
            placeholder="Busque por nome, categoria, plataforma ou descricao"
            suggestions={searchSuggestions}
            statusText="Use as sugestoes para preencher rapido enquanto filtra o catalogo."
            onQueryChange={onQueryChange}
            onSuggestionSelect={onSuggestionSelect}
          />

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label
                htmlFor="games-category"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
              >
                Categoria
              </label>
              <select
                id="games-category"
                value={selectedCategory}
                onChange={(event) => onCategoryChange(event.target.value)}
                className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition focus:border-red-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-red-400"
              >
                <option value={ALL_FILTERS_VALUE}>Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="games-platform"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
              >
                Plataforma
              </label>
              <select
                id="games-platform"
                value={selectedPlatform}
                onChange={(event) => onPlatformChange(event.target.value)}
                className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition focus:border-red-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-red-400"
              >
                <option value={ALL_FILTERS_VALUE}>Todas as plataformas</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="shrink-0 rounded-2xl bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
            {resultsCount} de {totalCount} jogo{totalCount === 1 ? "" : "s"}
          </div>
          <button
            type="button"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </div>
  );
}