import { NextRequest, NextResponse } from "next/server";
import { refreshVerify, sign, verify } from "./auth/token";
import { sql } from "@vercel/postgres";

export default async function checkAuth(id: string, accessToken: string) {
  // access-token 검증
  const verifyAccess = await verify(accessToken);
  if (verifyAccess.ok) {
    return { ok: true, data: accessToken, msg: "token 검증" };
  } else if (verifyAccess.msg == "ERR_JWT_EXPIRED") {
    const { rows } = await sql`SELECT refreshtoken FROM auth WHERE id=${id}`;
    if (rows.length !== 1) return { ok: false, data: "", msg: "계정 에러" };
    const refreshToken = rows[0].refreshtoken;

    // refresh-token 검증
    const verifyRefreshToken = await refreshVerify(refreshToken);
    if (verifyRefreshToken.ok) {
      const { id, email, name } = verifyRefreshToken.data as { id: string; email: string; name: string };

      // access-token 재발행
      const newAccessToken = await sign(id, email, name);
      return { ok: true, data: newAccessToken, msg: "token 재발행" };
    } else if (verifyRefreshToken.msg == "ERR_JWT_EXPIRED") {
      return { ok: false, data: "", msg: "token 만료" };
    }
  }

  return { ok: false, data: "", msg: "token error" };
}
