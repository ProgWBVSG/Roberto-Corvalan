import type { Metadata } from "next";
import LegalHeader from "@/components/LegalHeader";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo Roberto Corvalán recopila, usa y protege tus datos personales.",
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <main className="bg-ivory text-ink">
      <LegalHeader />

      <article className="container-x py-16 md:py-24">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="font-display text-3xl md:text-[2.7rem] leading-tight tracking-[-0.02em] mb-3">
          Política de Privacidad
        </h1>
        <p className="text-sm text-muted mb-12">Última actualización: julio de 2026.</p>

        <div className="max-w-2xl space-y-9 text-[1.02rem] leading-relaxed text-ink-2/85">
          <section>
            <h2 className="font-display text-xl text-ink mb-3">1. Quién trata tus datos</h2>
            <p>
              Roberto Corvalán, coach ejecutivo, es el responsable del tratamiento de los datos
              personales que se recopilan a través de este sitio web
              (robertocorvalan.com). Podés contactarnos en{" "}
              <a href="mailto:hola@robertocorvalan.com" className="text-gold hover:underline">
                hola@robertocorvalan.com
              </a>{" "}
              ante cualquier consulta sobre esta política.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">2. Qué datos recopilamos</h2>
            <p>Al completar el formulario de contacto, recopilamos:</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>Nombre y correo electrónico.</li>
              <li>Tu perfil (ejecutivo, organización o coach).</li>
              <li>El mensaje o consulta que nos escribas.</li>
            </ul>
            <p className="mt-3">
              Si nos escribís por WhatsApp, tratamos los datos que compartas voluntariamente en
              esa conversación (nombre y número de teléfono, entre otros).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">3. Para qué usamos tus datos</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>Responder tu consulta y coordinar una llamada o reunión.</li>
              <li>Brindarte información sobre nuestros programas de coaching, talleres y eventos.</li>
              <li>Mejorar la experiencia del sitio web.</li>
            </ul>
            <p className="mt-3">
              No vendemos, alquilamos ni compartimos tus datos personales con terceros con fines
              comerciales.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">4. Cuánto tiempo los conservamos</h2>
            <p>
              Conservamos tus datos mientras exista una relación activa (consulta en curso, proceso
              de coaching o comunidad) y, luego, por el plazo necesario para cumplir con
              obligaciones legales o resolver eventuales reclamos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">5. Tus derechos</h2>
            <p>
              De acuerdo con la Ley 25.326 de Protección de Datos Personales de Argentina, tenés
              derecho a acceder, rectificar, actualizar o solicitar la eliminación de tus datos
              personales. Para ejercer estos derechos, escribinos a{" "}
              <a href="mailto:hola@robertocorvalan.com" className="text-gold hover:underline">
                hola@robertocorvalan.com
              </a>
              . La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control
              de la Ley 25.326, tiene la atribución de atender denuncias y reclamos que se
              interpongan con relación al incumplimiento de las normas sobre protección de datos
              personales.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">6. Cookies y analítica</h2>
            <p>
              Este sitio puede utilizar cookies técnicas y herramientas de analítica web para
              entender cómo se usa el sitio y mejorarlo. Podés configurar tu navegador para
              rechazar cookies, aunque algunas funciones podrían verse afectadas.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">7. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta política periódicamente. Los cambios entrarán en vigencia
              desde su publicación en esta página.
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
