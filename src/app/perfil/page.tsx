'use client';

/**
 * Página inicial da seção de Perfil.
 */
import { use, useState, useEffect } from "react";
import { getGames, type Game } from "../../lib/games";

export default function PerfilPage() {
  async function adicionarFavorito(gameName: string) {
    // Exemplo de requisição para API local (ajuste a rota conforme sua API real)
    const res = await fetch("/api/games/favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: gameName }),
    });
    if (!res.ok) throw new Error("Erro ao adicionar favorito");
    return res.json();
  }

  const [loading, setLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
    const [games, setGames] = useState<Game[]>([]);
    const [search, setSearch] = useState("");
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    useEffect(() => {
      getGames().then(setGames);
    }, []);

    const filteredGames = search.trim()
      ? games.filter((g) => g.title.toLowerCase().includes(search.toLowerCase()))
      : games;

  async function handleAddFavorite(game: string) {
    setLoading(game);
    setSuccess(null);
    setError(null);
    try {
      await adicionarFavorito(game);
      setSuccess(`Jogo "${game}" adicionado aos favoritos!`);
    } catch {
      setError(`Erro ao adicionar "${game}" aos favoritos.`);
    } finally {
      setLoading(null);
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex w-full justify-end gap-3 mb-2">
        {/* Botão de Configuração */}
        <button
          title="Configurações"
          className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition shadow"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09c0 .66.39 1.25 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8c.66 0 1.25.39 1.51 1H21a2 2 0 1 1 0 4h-.09c-.66 0-1.25.39-1.51 1z" />
          </svg>
        </button>
        {/* Botão de Compartilhar */}
        <button
          title="Compartilhar Perfil"
          className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition shadow"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.59 13.51l6.83 3.98" />
            <path d="M15.41 6.51l-6.82 3.98" />
          </svg>
        </button>
      </div>
      <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">Perfil</h1>
      <div className="flex flex-col items-center gap-6 w-full">
        <span
          className="rounded-full border-4 border-red-500 bg-zinc-1000 flex items-center justify-center shadow-lg"
          style={{ width: 130, height: 130 }}
        >
          {/* SVG do botão de perfil do Header */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="90"
            height="90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="8" r="3.25" stroke="#ef4444" />
            <path d="M5.5 21a6.5 6.5 0 0 1 13 0" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </span>
        <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Nome do Usuário</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6">@usuario123</p>
        <div className="w-full max-w-md mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-8 shadow-md flex flex-col gap-5">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">Adicionar Jogo Favorito</h3>
          <div className="flex flex-col gap-3 mb-4 relative">
            <input
              type="text"
              className="w-full rounded-lg border px-3 py-2 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Digite o nome do jogo..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setSelectedGame(null);
              }}
              autoComplete="off"
            />
            {search && filteredGames.length > 0 && (
              <ul className="absolute z-10 left-0 right-0 bg-white dark:bg-zinc-700 border rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                {filteredGames.slice(0, 8).map(game => (
                  <li
                    key={game.id}
                    className={
                      "px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-600 text-left" +
                      (selectedGame?.id === game.id ? " bg-zinc-200 dark:bg-zinc-600" : "")
                    }
                    onClick={() => {
                      setSelectedGame(game);
                      setSearch(game.title);
                    }}
                  >
                    {game.title}
                  </li>
                ))}
              </ul>
            )}
            {selectedGame && (
              <div className="flex items-center gap-3 bg-white dark:bg-zinc-700 rounded-lg p-3 border mt-2">
                <img src={selectedGame.image_url} alt={selectedGame.title} className="w-12 h-12 rounded object-cover" />
                <div className="text-left">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">{selectedGame.title}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-300">{selectedGame.platforms.join(", ")}</div>
                </div>
              </div>
            )}
            <button
              className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition disabled:opacity-60"
              disabled={!selectedGame || loading === selectedGame.title}
              onClick={() => selectedGame && handleAddFavorite(selectedGame.title)}
            >
              {loading === selectedGame?.title ? "Adicionando..." : "Adicionar aos favoritos"}
            </button>
            {(success || error) && (
              <div className={"text-sm mt-2 " + (success ? "text-green-600" : "text-red-600")}>{success || error}</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
