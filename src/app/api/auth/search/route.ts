import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    // 아이디로 조회
    if (id) {
      const { rows } = await sql`SELECT id,name,email,fcmtoken FROM auth WHERE id = ${id}`;
      return NextResponse.json({ ok: true, data: rows, msg: "ID 계정 조회" }, { status: 200 });
    } else {
      const { rows } = await sql`SELECT id,name,email,fcmtoken FROM auth`;
      return NextResponse.json({ ok: true, data: rows, msg: "전체 계정 조회" }, { status: 200 });
    }
  } catch (e: any) {
    return NextResponse.json({ ok: false, data: [], msg: JSON.stringify(e) }, { status: e.responseCode });
  }
}
