import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "rc_admin";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 horas

const SECRET =
  process.env.SESSION_SECRET ?? "dev-insecure-secret-cambiar-en-produccion";

function sign(data: string): string {
  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/** Token firmado con vencimiento embebido. */
export function createToken(): string {
  const exp = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token?: string | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  if (!safeEqual(sig, sign(payload))) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && Date.now() < exp;
}

/** Compara la contraseña ingresada con ADMIN_PASSWORD (timing-safe). */
export function checkPassword(input: string): boolean {
  const pass = process.env.ADMIN_PASSWORD ?? "";
  if (!pass) return false;
  return safeEqual(input, pass);
}

/** Lee la cookie de sesión y valida. Usar en Server Components / actions. */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}
