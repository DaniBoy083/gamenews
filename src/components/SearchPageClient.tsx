"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { toast } from "react-hot-toast";
import { GameSearchInput } from "./GameSearchInput";

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

const imageSizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw";

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function SearchPageClient() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startPageTransition] = useTransition();
  const [games, setGames] = useState<Game[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const nextQuery = searchParams.get("q") ?? "";

    setQuery((currentValue) =>
      currentValue === nextQuery ? currentValue : nextQuery,
    );
  }, [searchParams]);

  const syncUrl = useCallback(
    (nextQuery: string) => {
      const params = new URLSearchParams();
      const trimmedQuery = nextQuery.trim();

      if (trimmedQuery) {
        params.set("q", trimmedQuery);
      }

      const nextHref = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;

      startPageTransition(() => {
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

  const filteredGames = useMemo(() => {
    const sanitizedQuery = normalizeText(deferredQuery.trim());

    if (!sanitizedQuery) {
      return games;
    }

    return games.filter((game) => {
      const searchableText = normalizeText(
        [
          game.title,
          game.description,
          game.categories.join(" "),
          game.platforms.join(" "),
          game.release,
        ].join(" "),
      );

      return searchableText.includes(sanitizedQuery);
    });
  }, [deferredQuery, games]);

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

  function handleQueryChange(value: string) {
    setQuery(value);
    syncUrl(value);
  }

  function handleSuggestionSelect(value: string) {
    setQuery(value);
    syncUrl(value);
  }

  return (
    <div className="mt-10 w-full space-y-8">
      <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950">
        <GameSearchInput
          id="global-search"
          label="Pesquisa em tempo real"
          query={query}
          placeholder="Digite para atualizar a busca enquanto voce escreve"
          suggestions={searchSuggestions}
          helperHref="/games"
          helperLabel="Voltar ao catalogo"
          statusText={
            isPending
              ? "Atualizando a pagina de busca enquanto voce digita..."
              : "A URL e os resultados acompanham o que voce escreve neste campo."
          }
          onQueryChange={handleQueryChange}
          onSuggestionSelect={handleSuggestionSelect}
        />
      </div>

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

      {!isLoading && !errorMessage ? (
        <div className="flex items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Search
          </p>
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            {filteredGames.length} resultado{filteredGames.length === 1 ? "" : "s"}
          </p>
        </div>
      ) : null}

      {!isLoading && !errorMessage && filteredGames.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-6 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
          Nenhum jogo corresponde ao termo pesquisado.
        </div>
      ) : null}

      {!isLoading && !errorMessage && filteredGames.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredGames.map((game) => (
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
      ) : null}
    </div>
  );
}