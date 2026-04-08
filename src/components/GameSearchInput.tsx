"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type GameSearchInputProps = {
  id: string;
  label: string;
  query: string;
  placeholder: string;
  suggestions: string[];
  helperHref?: string;
  helperLabel?: string;
  statusText?: string;
  variant?: "default" | "compact";
  onQueryChange: (value: string) => void;
  onSuggestionSelect: (value: string) => void;
  onEnter?: (value: string) => void;
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function highlightSuggestion(suggestion: string, query: string) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return suggestion;
  }

  const normalizedSuggestion = normalizeText(suggestion);
  const normalizedQuery = normalizeText(trimmedQuery);
  const matchIndex = normalizedSuggestion.indexOf(normalizedQuery);

  if (matchIndex === -1) {
    return suggestion;
  }

  const matchedText = suggestion.slice(matchIndex, matchIndex + trimmedQuery.length);
  const before = suggestion.slice(0, matchIndex);
  const after = suggestion.slice(matchIndex + trimmedQuery.length);

  return (
    <>
      {before}
      <mark className="rounded bg-red-100 px-1 text-red-700 dark:bg-red-500/20 dark:text-red-200">
        {matchedText}
      </mark>
      {after}
    </>
  );
}

export function GameSearchInput({
  id,
  label,
  query,
  placeholder,
  suggestions,
  helperHref,
  helperLabel,
  statusText,
  variant = "default",
  onQueryChange,
  onSuggestionSelect,
  onEnter,
}: GameSearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const visibleSuggestions = useMemo(
    () => suggestions.filter(Boolean).slice(0, 6),
    [suggestions],
  );

  const safeActiveIndex =
    activeIndex >= 0 && activeIndex < visibleSuggestions.length ? activeIndex : -1;
  const shouldShowSuggestions = isFocused && visibleSuggestions.length > 0;
  const isCompact = variant === "compact";

  function selectSuggestion(value: string) {
    onSuggestionSelect(value);
    setActiveIndex(-1);
    setIsFocused(false);
  }

  return (
    <div>
      <div className={isCompact ? "mb-2" : "mb-3 flex items-center justify-between gap-3"}>
        <label
          htmlFor={id}
          className={
            isCompact
              ? "sr-only"
              : "block text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400"
          }
        >
          {label}
        </label>

        {!isCompact && helperHref && helperLabel ? (
          <Link
            href={helperHref}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600 transition hover:text-red-500 dark:text-red-300 dark:hover:text-red-200"
          >
            {helperLabel}
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <input
          id={id}
          role="combobox"
          type="search"
          autoComplete="off"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => window.setTimeout(() => setIsFocused(false), 120)}
          onChange={(event) => {
            setIsFocused(true);
            setActiveIndex(-1);
            onQueryChange(event.target.value);
          }}
          onKeyDown={(event) => {
            if (!shouldShowSuggestions && event.key === "Enter") {
              onEnter?.(query);
              return;
            }

            if (!shouldShowSuggestions) {
              return;
            }

            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActiveIndex((currentIndex) =>
                currentIndex >= visibleSuggestions.length - 1 ? 0 : currentIndex + 1,
              );
              return;
            }

            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((currentIndex) =>
                currentIndex <= 0 ? visibleSuggestions.length - 1 : currentIndex - 1,
              );
              return;
            }

            if (event.key === "Escape") {
              setIsFocused(false);
              setActiveIndex(-1);
              return;
            }

            if (event.key === "Enter") {
              event.preventDefault();

              if (safeActiveIndex >= 0) {
                selectSuggestion(visibleSuggestions[safeActiveIndex]);
                return;
              }

              onEnter?.(query);
            }
          }}
          placeholder={placeholder}
          aria-expanded={shouldShowSuggestions}
          aria-haspopup="listbox"
          aria-controls={`${id}-suggestions`}
          aria-activedescendant={
            safeActiveIndex >= 0 ? `${id}-suggestion-${safeActiveIndex}` : undefined
          }
          style={{ WebkitTextFillColor: "currentColor" }}
          className={`w-full rounded-2xl border border-zinc-300 bg-zinc-50 text-zinc-950 caret-red-500 outline-none transition placeholder:text-zinc-400 focus:border-red-500 focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-red-400 ${
            isCompact ? "px-4 py-2.5 text-sm" : "px-4 py-3 text-base"
          }`}
        />

        {shouldShowSuggestions ? (
          <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950">
            <div className="border-b border-zinc-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              Sugestoes
            </div>
            <ul id={`${id}-suggestions`} role="listbox">
              {visibleSuggestions.map((suggestion, index) => (
                <li key={suggestion}>
                  <button
                    id={`${id}-suggestion-${index}`}
                    role="option"
                    aria-selected={index === safeActiveIndex}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      selectSuggestion(suggestion);
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium transition ${
                      index === safeActiveIndex
                        ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-white"
                        : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{highlightSuggestion(suggestion, query)}</span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                      preencher
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {statusText ? (
        <p className="mt-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {statusText}
        </p>
      ) : null}
    </div>
  );
}