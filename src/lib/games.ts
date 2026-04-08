export type Game = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  platforms: string[];
  categories: string[];
  release: string;
};

export const GAMES_API_URL = "https://sujeitoprogramador.com/next-api/?api=games";
export const GAME_DAY_URL = "https://sujeitoprogramador.com/next-api/?api=game_day";
export const GAMES_REVALIDATE_SECONDS = 320;

export async function getGames(): Promise<Game[]> {
  try {
    const response = await fetch(GAMES_API_URL, {
      next: { revalidate: GAMES_REVALIDATE_SECONDS, tags: ["games-list"] },
    });

    if (!response.ok) {
      return [];
    }

    return (await response.json()) as Game[];
  } catch {
    return [];
  }
}

export async function getGameById(id: number): Promise<Game | null> {
  const games = await getGames();

  return games.find((game) => game.id === id) ?? null;
}

export async function getDailyGame(): Promise<Game | null> {
  try {
    const response = await fetch(GAME_DAY_URL, {
      next: { revalidate: GAMES_REVALIDATE_SECONDS, tags: ["game-day"] },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as Game;
  } catch {
    return null;
  }
}

export function getSearchMatches(games: Game[], query: string): Game[] {
  const sanitizedQuery = normalizeText(query.trim());

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
}

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}