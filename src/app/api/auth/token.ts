import { sql } from "@vercel/postgres";
import { jwtVerify, SignJWT } from "jose";
const secret = process.env.JWT_SECRET!;
import bcrypt from "bcryptjs";
const saltRounds = 10;

// 비밀번호 hash
export const getHashPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

// 비밀번호 hash
export const passwordMatch = async (password: string, storedHashedPassword: string) => {
  // compareSync 함수를 사용하여 입력된 비밀번호와 저장된 해시된 비밀번호를 비교
  const isPasswordMatch = bcrypt.compareSync(password, storedHashedPassword);
  return isPasswordMatch;
};

const issuer = "lsw-app-token-issuer";
const audience = "user";

// access Token 발급
export const sign = async (id: string, email: string, name: string) => {
  const payload = { id, email, name };
  const algorithm = "HS256";
  const expirationTime = "30m";

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: algorithm, typ: "JWT" })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expirationTime)
    .sign(new TextEncoder().encode(secret));

  return token;
};

// access Token 검증
export const verify = async (token: string) => {
  try {
    const decoded = await jwtVerify(token, new TextEncoder().encode(secret));
    const { id, email, name } = decoded.payload!;
    return {
      ok: true,
      data: { id, email, name },
      msg: "토큰 검증 완료",
    };
  } catch (error: any) {
    return {
      ok: false,
      data: { id: "", email: "", name: "" },
      msg: `${error.code}`,
    };
  }
};

// refresh Token 발급
export const refresh = async (id: string, email: string, name: string) => {
  const payload = { id, email, name };
  const algorithm = "HS256";
  const expirationTime = "14d";

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: algorithm, typ: "JWT" })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expirationTime)
    .sign(new TextEncoder().encode(secret));

  return token;
};

// refresh Token 검증set
export const refreshVerify = async (token: string) => {
  try {
    const decoded = await jwtVerify(token, new TextEncoder().encode(secret));
    const { id, email, name } = decoded.payload!;
    return {
      ok: true,
      data: { id, email, name },
      msg: "토큰 검증 완료",
    };
  } catch (error: any) {
    return {
      ok: false,
      data: { id: "", email: "", name: "" },
      msg: error.code,
    };
  }
};
