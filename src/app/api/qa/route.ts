import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();

    // const likes = 100;
    // const { rows } = await sql`SELECT * FROM QA WHERE likes > ${likes};`;
    const { rows } = title == "total" ? await sql`SELECT * FROM qa` : await sql`SELECT * FROM qa WHERE board_type = ${title}`;
    const result = NextResponse.json({ ok: true, data: rows, msg: `FAQ [${title}] 조회` }, { status: 200 });
    return result;
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ ok: false, data: [], msg: "api error" }, { status: e.responseCode });
  }
}
