import type { Metadata } from "next";
import LegalHeader from "@/components/LegalHeader";
import Footer from "@/components/Footer";
import { getFooterProps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Borrar cuenta · Rumbo",
  description: "Cómo borrar tu cuenta de la app Rumbo.",
  alternates: { canonical: "/borrar-cuenta-rumbo" },
  robots: { index: true, follow: true },
};

export default async function Page() {
  const footerProps = await getFooterProps();
  return (
    <main className="bg-ivory text-ink">
      <LegalHeader />
      <article className="container-x py-16 md:py-24">
        <div className="max-w-2xl space-y-6 text-[1.02rem] leading-relaxed text-ink-2/85">
          <h1 className="font-display text-3xl md:text-[2.7rem] leading-tight tracking-[-0.02em] text-ink">Cómo borrar tu cuenta de la Rumbo</h1>
          <p>Podés borrar tu cuenta y todos tus registros cuando quieras.</p>
          <p><strong>Desde la app</strong></p>
          <ol className="space-y-2 list-decimal pl-5">
            <li>Ingresá a Rumbo.</li>
            <li>Tocá Más › Mi cuenta.</li>
            <li>Tocá &quot;Borrar mi cuenta&quot;, escribí tu contraseña y confirmá.</li>
          </ol>
          <p>Se eliminan de forma permanente tu cuenta, tu nombre, tu email y todos tus compromisos, acciones, aprendizajes, objetivos y registros.</p>
          <p><strong>Si no podés ingresar</strong></p>
          <p>Escribí a info@robertocorvalancoach.com.ar desde el email de tu cuenta, con el asunto &quot;Borrar mi cuenta&quot;. La borramos dentro de los 30 días.</p>
        </div>
      </article>
      <Footer {...footerProps} />
    </main>
  );
}
