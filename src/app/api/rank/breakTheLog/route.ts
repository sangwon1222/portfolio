import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const {rows} = await sql`SELECT * FROM rank ORDER BY score ASC`;
    const {rows} = await sql`SELECT * FROM rank WHERE gamename = 'breakthelog' ORDER BY score DESC`;
    return NextResponse.json({ ok:true, data:rows }, { status: 200 });

  } catch (e: any) {
    return NextResponse.json({ ok: false, msg: e });
  }
}
