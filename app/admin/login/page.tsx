import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import PasswordInput from "@/components/PasswordInput";

export const metadata: Metadata = {
  title: "Acceso — Panel",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthed()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-navy text-ivory px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-2 mb-3">
            Panel de consultas
          </p>
          <h1 className="font-display text-3xl">Roberto Corvalán</h1>
        </div>

        <form
          action="/api/admin/login"
          method="POST"
          className="rounded-2xl bg-white/[0.03] border border-[color:var(--navy-line)] p-7 space-y-5"
        >
          <div>
            <label htmlFor="password" className="block text-sm text-white/60 mb-2">
              Contraseña
            </label>
            <PasswordInput />
          </div>

          {error === "blocked" ? (
            <p className="text-sm text-[#e0a4a4]">
              Demasiados intentos. Esperá unos minutos y volvé a probar.
            </p>
          ) : error ? (
            <p className="text-sm text-[#e0a4a4]">Contraseña incorrecta.</p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-[#1a1206] transition-colors hover:bg-gold-2"
          >
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}
