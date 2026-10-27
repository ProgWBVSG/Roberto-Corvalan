import type { Metadata } from "next";
import LegalHeader from "@/components/LegalHeader";
import Footer from "@/components/Footer";
import { getFooterProps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidad · Rumbo",
  description: "Política de privacidad de la app Rumbo.",
  alternates: { canonical: "/privacidad-rumbo" },
  robots: { index: true, follow: true },
};

export default async function Page() {
  const footerProps = await getFooterProps();
  return (
    <main className="bg-ivory text-ink">
      <LegalHeader />
      <article className="container-x py-16 md:py-24">
        <div className="max-w-2xl space-y-6 text-[1.02rem] leading-relaxed text-ink-2/85">
          <h1 className="font-display text-3xl md:text-[2.7rem] leading-tight tracking-[-0.02em] text-ink">Política de privacidad · Rumbo</h1>
          <p>BORRADOR para revisar por Roberto Corvalán o su asesor legal antes de publicar.</p>
          <p>Última actualización: [fecha]</p>
          <p><strong>Responsable:</strong> Roberto C. Corvalán · info@robertocorvalancoach.com.ar · Argentina.</p>
          <h2 className="font-display text-xl text-ink">Qué datos guardamos</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Nombre y email, para crear tu cuenta.</li>
              <li>Tu número de WhatsApp, para que tu coach pueda contactarte y coordinar las sesiones.</li>
            <li>Lo que escribís en la app: compromisos, acciones, aprendizajes, objetivos y registros semanales.</li>
            <li>Si avisás un pago, la fecha del aviso. Los datos de pago los procesa Mercado Pago o tu banco; la app no los recibe.</li>
          </ul>
          <h2 className="font-display text-xl text-ink">Para qué los usamos</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Para que puedas usar la app y ver tu información en cualquier dispositivo.</li>
            <li>Si te vinculás con tu coach, para que pueda acompañar tu proceso y dejarte notas.</li>
            <li>No vendemos ni compartimos tus datos con terceros con fines comerciales.</li>
          </ul>
          <h2 className="font-display text-xl text-ink">Quién puede verlos</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Vos.</li>
            <li>Tu coach, solo si te vinculás con su código. Podés desvincularte cuando quieras desde Más › Mi coach.</li>
          </ul>
          <h2 className="font-display text-xl text-ink">Dónde se guardan</h2>
          <p>En Firebase (Google Cloud), con conexión cifrada.</p>
          <h2 className="font-display text-xl text-ink">Tus derechos</h2>
          <p>Podés acceder, corregir o borrar tus datos. Para borrar tu cuenta y todos tus registros: Más › Mi cuenta › Borrar mi cuenta, o escribinos a info@robertocorvalancoach.com.ar.</p>
          <p>[Revisar con un asesor la mención a la Ley 25.326 de Protección de Datos Personales y a la Agencia de Acceso a la Información Pública.]</p>
        </div>
      </article>
      <Footer {...footerProps} />
    </main>
  );
}
