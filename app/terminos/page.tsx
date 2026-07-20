import type { Metadata } from "next";
import LegalHeader from "@/components/LegalHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Condiciones de uso del sitio web y los servicios de Roberto Corvalán.",
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <main className="bg-ivory text-ink">
      <LegalHeader />

      <article className="container-x py-16 md:py-24">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="font-display text-3xl md:text-[2.7rem] leading-tight tracking-[-0.02em] mb-3">
          Términos y Condiciones
        </h1>
        <p className="text-sm text-muted mb-12">Última actualización: julio de 2026.</p>

        <div className="max-w-2xl space-y-9 text-[1.02rem] leading-relaxed text-ink-2/85">
          <section>
            <h2 className="font-display text-xl text-ink mb-3">1. Aceptación</h2>
            <p>
              Al navegar y utilizar este sitio web (robertocorvalan.com), aceptás los presentes
              Términos y Condiciones. Si no estás de acuerdo, te pedimos que no utilices el sitio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">2. Sobre los servicios</h2>
            <p>
              Roberto Corvalán ofrece servicios de coaching ejecutivo, talleres para equipos,
              conferencias y consultoría organizacional. La información publicada en este sitio
              tiene carácter informativo y no constituye una oferta vinculante hasta tanto se
              acuerden por separado los términos específicos de cada proceso (alcance, duración,
              modalidad y honorarios).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">3. Uso del sitio</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Usar el sitio de forma lícita y conforme a estos términos.</li>
              <li>No intentar vulnerar la seguridad del sitio ni acceder a áreas restringidas.</li>
              <li>No utilizar el formulario de contacto con fines distintos a los previstos.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">4. Propiedad intelectual</h2>
            <p>
              Los textos, imágenes, metodología y demás contenidos de este sitio son propiedad de
              Roberto Corvalán o se utilizan con la debida autorización. Su reproducción total o
              parcial sin autorización previa está prohibida.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">5. Confidencialidad</h2>
            <p>
              Los procesos de coaching son confidenciales. La información compartida durante las
              sesiones no se divulga a terceros, salvo consentimiento expreso o requerimiento
              legal.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">6. Enlaces a terceros</h2>
            <p>
              Este sitio puede contener enlaces a redes sociales o sitios de terceros (por
              ejemplo, WhatsApp, Instagram o LinkedIn). No nos responsabilizamos por el contenido
              o las políticas de privacidad de esos sitios externos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">7. Modificaciones</h2>
            <p>
              Podemos actualizar estos Términos y Condiciones en cualquier momento. La versión
              vigente será siempre la publicada en esta página.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">8. Contacto</h2>
            <p>
              Ante cualquier consulta sobre estos términos, escribinos a{" "}
              <a href="mailto:hola@robertocorvalan.com" className="text-gold hover:underline">
                hola@robertocorvalan.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
