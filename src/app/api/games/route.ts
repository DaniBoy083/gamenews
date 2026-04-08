import { NextResponse } from "next/server";
import { getGames } from "../../../lib/games";

export async function GET() {
  try {
    const games = await getGames();

    if (games.length === 0) {
      return NextResponse.json(
        { message: "Nao foi possivel carregar os jogos." },
        { status: 500 },
      );
    }

    return NextResponse.json(games);
  } catch {
    return NextResponse.json(
      { message: "Nao foi possivel carregar os jogos." },
      { status: 500 },
    );
  }
}