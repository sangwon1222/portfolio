import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  try {
    await sql`UPDATE auth SET refreshtoken = '' WHERE id = ${id} `;

    return NextResponse.json({ ok: true, data: [], msg: "로그아웃" });
  } catch (e: any) {
    console.log("path: api/auth/sign-out  ,  method: POST", { e });
    return NextResponse.json({ ok: false, data: [], msg: e });
  }
}
