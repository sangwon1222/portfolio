import { decodeAES } from "@/util";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { e } = await req.json();
    const { id, name, password, newPassword, email } = JSON.parse(decodeAES(e));

    if (name) {
      const { rows } = await sql`UPDATE auth SET name = ${name} WHERE id = ${id}`;
      return NextResponse.json({ ok: true, data: rows, msg: "이름 변경" }, { status: 200 });
    } else if (password && newPassword) {
      const useAccount = await sql`SELECT * FROM auth WHERE id = ${id}`;
      const isMatch = bcrypt.compareSync(password, useAccount.rows[0].password);
      if (isMatch) {
        const { rows } = await sql`UPDATE auth SET password = ${newPassword} WHERE id = ${id}`;
        return NextResponse.json({ ok: true, data: rows, msg: "비밀번호 변경" }, { status: 200 });
      } else {
        return NextResponse.json({ ok: false, data: [], msg: "비밀번호가 틀렸습니다." });
      }
    } else if (email) {
      const { rows } = await sql`UPDATE auth SET email = ${email} WHERE id = ${id}`;
      return NextResponse.json({ ok: true, data: rows, msg: "이메일 변경" }, { status: 200 });
    } else {
      return NextResponse.json({ ok: false, data: [], msg: "파라미터 ERROR" });
    }
  } catch (e: any) {
    console.log("app/api/auth/edit", e);
    return NextResponse.json({ ok: false, data: [], msg: JSON.stringify(e) }, { status: e.responseCode });
  }
}
