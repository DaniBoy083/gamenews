import { NextResponse } from "next/server";

type Game = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  platforms: string[];
  categories: string[];
  release: string;
};

const GAMES_API_URL = "https://sujeitoprogramador.com/next-api/?api=games";

export async function GET() {
  try {
    const response = await fetch(GAMES_API_URL, {
      next: { revalidate: 320, tags: ["games-list"] },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Nao foi possivel carregar os jogos." },
        { status: response.status },
      );
    }

    const games = (await response.json()) as Game[];

    return NextResponse.json(games);
  } catch {
    return NextResponse.json(
      { message: "Nao foi possivel carregar os jogos." },
      { status: 500 },
    );
  }
}