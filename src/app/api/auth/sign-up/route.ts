import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { refresh, sign } from "../token";
import { decodeAES } from "@/util";

// 회원가입
export async function POST(req: NextRequest) {
  const { e } = await req.json();
  const { id, name, hash, email, fcmToken } = JSON.parse(decodeAES(e));

  try {
    const token = await sign(id, email, name);
    const refreshToken = await refresh(id, email, name);

    const { rows } = await sql`
    INSERT INTO auth
    (
      id,
      name,
      password,
      email,
      refreshtoken,
      fcmToken
    )
    VALUES
    (
      ${id},
      ${name},
      ${hash},
      ${email},
      ${refreshToken},
      ${fcmToken}
    )
    `;

    return NextResponse.json({ ok: true, data: token, msg: "회원가입" }, { status: 200 });
  } catch (e: any) {
    console.log({ e });
    return NextResponse.json({ ok: false, data: [], msg: "회원가입 실패" }, { status: e.responseCode });
  }
}
