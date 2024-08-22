import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { decodeAES } from "@/util";
import { refresh, sign } from "../token";

export async function POST(req: NextRequest) {
  try {
    const { e } = await req.json();
    const { id, password, fcmToken } = JSON.parse(decodeAES(e));
    const { rows } = await sql`SELECT * FROM auth WHERE id = ${id}`;

    // DB에 계정 없거나 하나 이상
    if (rows.length != 1) {
      return NextResponse.json({ ok: false, data: [], msg: "존재하지 않는 계정입니다." }, { status: 405 });
    }

    // DB에 계정 하나 존재
    if (rows.length == 1) {
      // DB의 암호화된 패스워드 검증
      const isMatch = bcrypt.compareSync(password, rows[0].password);
      if (isMatch) {
        const { id, email, name } = rows[0];
        const token = await sign(id, email, name);

        const refreshToken = await refresh(id, email, name);
        await sql`UPDATE auth SET refreshtoken = ${refreshToken}, fcmtoken = ${fcmToken} WHERE id = ${id}`;

        return NextResponse.json({ ok: true, data: token, msg: "로그인 성공" });
      } else {
        return NextResponse.json({ ok: false, data: [], msg: "아이디 또는 비밀번호를 잘못 입력했습니다." });
      }
    }
  } catch (e: any) {
    console.log("path: api/auth/sign-in  ,  method: POST", { e });
    return NextResponse.json({ ok: false, data: [], msg: e });
  }
}
