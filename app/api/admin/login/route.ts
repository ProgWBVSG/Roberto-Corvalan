import { NextResponse } from "next/server";
import {
  checkPassword,
  createToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth";

export const runtime = "nodejs";

// Rate-limit anti brute-force: máx 6 intentos fallidos por IP en 10 min.
const MAX_ATTEMPTS = 6;
const WINDOW = 10 * 60 * 1000;
const attempts = new Map<string, { count: number; first: number }>();

function isBlocked(ip: string): boolean {
  const rec = attempts.get(ip);
  if (!rec || Date.now() - rec.first > WINDOW) return false;
  return rec.count >= MAX_ATTEMPTS;
}
function recordFail(ip: string) {
  const rec = attempts.get(ip);
  if (!rec || Date.now() - rec.first > WINDOW) {
    attempts.set(ip, { count: 1, first: Date.now() });
  } else {
    rec.count++;
  }
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isBlocked(ip)) {
    return NextResponse.redirect(
      new URL("/admin/login?error=blocked", req.url),
      303
    );
  }

  const form = await req.formData();
  const password = String(form.get("password") ?? "");

  if (!checkPassword(password)) {
    recordFail(ip);
    return NextResponse.redirect(new URL("/admin/login?error=1", req.url), 303);
  }

  attempts.delete(ip); // login correcto: limpia el contador
  const res = NextResponse.redirect(new URL("/admin", req.url), 303);
  res.cookies.set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
