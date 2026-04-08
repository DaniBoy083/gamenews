"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { GamesFilters } from "./GamesFilters";

type Game = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  platforms: string[];
  categories: string[];
  release: string;
};

type ApiError = {
  message?: string;
};

type FilterState = {
  query: string;
  selectedCategory: string;
  selectedPlatform: string;
  currentPage: number;
};

const ALL_FILTERS_VALUE = "all";
const ITEMS_PER_PAGE = 6;
const imageSizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw";

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function GamesSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_FILTERS_VALUE);
  const [selectedPlatform, setSelectedPlatform] = useState(ALL_FILTERS_VALUE);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const nextQuery = searchParams.get("q") ?? "";
    const nextCategory = searchParams.get("category") ?? ALL_FILTERS_VALUE;
    const nextPlatform = searchParams.get("platform") ?? ALL_FILTERS_VALUE;
    const pageParam = Number(searchParams.get("page") ?? "1");
    const nextPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

    setQuery((currentValue) =>
      currentValue === nextQuery ? currentValue : nextQuery,
    );
    setSelectedCategory((currentValue) =>
      currentValue === nextCategory ? currentValue : nextCategory,
    );
    setSelectedPlatform((currentValue) =>
      currentValue === nextPlatform ? currentValue : nextPlatform,
    );
    setCurrentPage((currentValue) =>
      currentValue === nextPage ? currentValue : nextPage,
    );
  }, [searchParams]);

  const syncUrl = useCallback(
    (nextState: FilterState) => {
      const params = new URLSearchParams();
      const trimmedQuery = nextState.query.trim();

      if (trimmedQuery) {
        params.set("q", trimmedQuery);
      }

      if (nextState.selectedCategory !== ALL_FILTERS_VALUE) {
        params.set("category", nextState.selectedCategory);
      }

      if (nextState.selectedPlatform !== ALL_FILTERS_VALUE) {
        params.set("platform", nextState.selectedPlatform);
      }

      if (nextState.currentPage > 1) {
        params.set("page", String(nextState.currentPage));
      }

      const nextHref = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;

      startTransition(() => {
        router.replace(nextHref, { scroll: false });
      });
    },
    [pathname, router],
  );

  useEffect(() => {
    let isActive = true;

    async function loadGames() {
      try {
        const response = await fetch("/api/games");
        const data = (await response.json()) as Game[] | ApiError;

        if (!response.ok) {
          throw new Error(
            "message" in data && data.message
              ? data.message
              : "Nao foi possivel carregar os jogos.",
          );
        }

        if (!isActive) {
          return;
        }

        setGames(Array.isArray(data) ? data : []);
        setErrorMessage(null);
      } catch (error) {
        if (!isActive) {
          return;
        }

        const nextMessage =
          error instanceof Error
            ? error.message
            : "Nao foi possivel carregar os jogos.";

        setErrorMessage(nextMessage);
        toast.error(nextMessage);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadGames();

    return () => {
      isActive = false;
    };
  }, []);

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(games.flatMap((game) => game.categories))).sort((left, right) =>
        left.localeCompare(right, "pt-BR"),
      ),
    [games],
  );

  const platformOptions = useMemo(
    () =>
      Array.from(new Set(games.flatMap((game) => game.platforms))).sort((left, right) =>
        left.localeCompare(right, "pt-BR"),
      ),
    [games],
  );

  const searchSuggestions = useMemo(() => {
    const sanitizedQuery = normalizeText(query.trim());

    if (!sanitizedQuery) {
      return games.slice(0, 6).map((game) => game.title);
    }

    return games
      .filter((game) =>
        normalizeText(
          [game.title, game.categories.join(" "), game.platforms.join(" ")].join(" "),
        ).includes(sanitizedQuery),
      )
      .map((game) => game.title)
      .filter((title, index, collection) => collection.indexOf(title) === index)
      .slice(0, 6);
  }, [games, query]);

  const filteredGames = useMemo(() => {
    const sanitizedQuery = normalizeText(deferredQuery.trim());

    return games.filter((game) => {
      const matchesCategory =
        selectedCategory === ALL_FILTERS_VALUE ||
        game.categories.includes(selectedCategory);
      const matchesPlatform =
        selectedPlatform === ALL_FILTERS_VALUE ||
        game.platforms.includes(selectedPlatform);

      if (!matchesCategory || !matchesPlatform) {
        return false;
      }

      if (!sanitizedQuery) {
        return true;
      }

      const searchableText = normalizeText(
        [
          game.title,
          game.description,
          game.release,
          game.categories.join(" "),
          game.platforms.join(" "),
        ].join(" "),
      );

      return searchableText.includes(sanitizedQuery);
    });
  }, [deferredQuery, games, selectedCategory, selectedPlatform]);

  const totalPages = Math.max(1, Math.ceil(filteredGames.length / ITEMS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (currentPage <= totalPages) {
      return;
    }

    setCurrentPage(totalPages);
    syncUrl({
      query,
      selectedCategory,
      selectedPlatform,
      currentPage: totalPages,
    });
  }, [currentPage, query, selectedCategory, selectedPlatform, syncUrl, totalPages]);

  const paginatedGames = useMemo(() => {
    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;

    return filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [activePage, filteredGames]);

  function handleQueryChange(value: string) {
    setQuery(value);
    setCurrentPage(1);
    syncUrl({
      query: value,
      selectedCategory,
      selectedPlatform,
      currentPage: 1,
    });
  }

  function handleSuggestionSelect(value: string) {
    handleQueryChange(value);
  }

  function handleCategoryChange(value: string) {
    setSelectedCategory(value);
    setCurrentPage(1);
    syncUrl({
      query,
      selectedCategory: value,
      selectedPlatform,
      currentPage: 1,
    });
  }

  function handlePlatformChange(value: string) {
    setSelectedPlatform(value);
    setCurrentPage(1);
    syncUrl({
      query,
      selectedCategory,
      selectedPlatform: value,
      currentPage: 1,
    });
  }

  function handleReset() {
    setQuery("");
    setSelectedCategory(ALL_FILTERS_VALUE);
    setSelectedPlatform(ALL_FILTERS_VALUE);
    setCurrentPage(1);
    syncUrl({
      query: "",
      selectedCategory: ALL_FILTERS_VALUE,
      selectedPlatform: ALL_FILTERS_VALUE,
      currentPage: 1,
    });
  }

  function handlePageChange(nextPage: number) {
    setCurrentPage(nextPage);
    syncUrl({
      query,
      selectedCategory,
      selectedPlatform,
      currentPage: nextPage,
    });
  }

  return (
    <div className="mt-10 w-full space-y-8">
      <GamesFilters
        query={query}
        selectedCategory={selectedCategory}
        selectedPlatform={selectedPlatform}
        categories={categoryOptions}
        platforms={platformOptions}
        searchSuggestions={searchSuggestions}
        resultsCount={filteredGames.length}
        totalCount={games.length}
        onQueryChange={handleQueryChange}
        onSuggestionSelect={handleSuggestionSelect}
        onCategoryChange={handleCategoryChange}
        onPlatformChange={handlePlatformChange}
        onReset={handleReset}
      />

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="aspect-16/10 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
              <div className="space-y-3 p-5">
                <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!isLoading && errorMessage ? (
        <div className="rounded-3xl border border-dashed border-red-300 bg-red-50 p-6 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">
          {errorMessage}
        </div>
      ) : null}

      {!isLoading && !errorMessage && filteredGames.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-6 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
          Nenhum jogo encontrado para a busca atual.
        </div>
      ) : null}

      {!isLoading && !errorMessage && filteredGames.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedGames.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_20px_70px_-45px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="relative aspect-16/10 bg-zinc-200 dark:bg-zinc-900">
                  <Image
                    src={game.image_url}
                    alt={`Capa do jogo ${game.title}`}
                    fill
                    sizes={imageSizes}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                </div>

                <div className="p-5">
                  <h2 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
                    {game.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                Pagina {activePage} de {totalPages}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(activePage - 1)}
                  disabled={activePage === 1}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    aria-current={page === activePage ? "page" : undefined}
                    className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition ${
                      page === activePage
                        ? "bg-red-600 text-white"
                        : "border border-zinc-300 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(activePage + 1)}
                  disabled={activePage === totalPages}
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
                >
                  Proxima
                </button>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}