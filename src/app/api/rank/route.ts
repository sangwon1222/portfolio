import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
      const  { gamename,nickname,score } = await req.json();

    await sql`INSERT INTO rank (gamename,nickname, score) VALUES (${gamename.toLowerCase()},${nickname.trim()},${score})`;
    return NextResponse.json({ ok: true, msg: "랭크 등록" }, { status: 200 });

  } catch (e: any) {
    return NextResponse.json({ ok: false, msg: e });
  }
}
