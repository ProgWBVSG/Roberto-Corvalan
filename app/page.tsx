import Image from "next/image";
import SiteNav from "@/components/SiteNav";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import ScrollProgress from "@/components/ScrollProgress";
import SplitHeading from "@/components/SplitHeading";
import Marquee from "@/components/Marquee";
import MagneticButton from "@/components/MagneticButton";
import SpotlightCard from "@/components/SpotlightCard";
import FloatingAssistant from "@/components/FloatingAssistant";
import ScrollToTop from "@/components/ScrollToTop";
import ShaderBackground from "@/components/ui/shader-background";
import Typewriter from "@/components/Typewriter";
import LogoMarquee from "@/components/LogoMarquee";
import StickyServices from "@/components/StickyServices";
import RolesCarousel from "@/components/RolesCarousel";
import CertificadoCIC from "@/components/CertificadoCIC";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";
import { imgSrc, iconLibrary } from "@/lib/content-schema";

function EventTile({
  src,
  alt,
  ratio = "aspect-[4/3]",
  position = "object-center",
}: {
  src: string;
  alt: string;
  ratio?: string;
  position?: string;
}) {
  return (
    <div className={`group relative ${ratio} overflow-hidden rounded-2xl border border-[color:var(--line)]`}>
      <Image
        src={src}
        alt={alt}
        fill
        quality={90}
        sizes="(max-width: 768px) 90vw, 45vw"
        className={`object-cover ${position} transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105`}
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-colors duration-500 group-hover:ring-[color:var(--gold)]/40" />
    </div>
  );
}

export const revalidate = 0;

export default async function Home() {
  const content = await getContent();
  const { global, hero, empresas, servicios, ctaBand, enfoque, sobreMi, comunidad, eventos, banner, testimonios, contacto, footer } = content;

  const waLink = (msg: string) =>
    `https://wa.me/${global.whatsappNumber}?text=${encodeURIComponent(msg)}`;

  return (
    <main id="top" className="bg-ivory text-ink">
      <ScrollProgress />
      <SiteNav />

      {/* ============ HERO ============ */}
      <section className="relative min-h-[100svh] w-full overflow-hidden bg-navy text-ivory flex flex-col">
        {/* Foto de fondo */}
        <Image
          src={imgSrc(hero.background)}
          alt={hero.background.alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[68%_18%] md:object-right"
        />
        {/* Degradados para legibilidad del texto (más marcados en mobile para calmar la foto) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080d] via-[#06080d]/80 md:via-[#06080d]/60 to-[#06080d]/30 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/45 to-[#06080d]/55 md:via-transparent md:to-[#06080d]/40" />

        <div className="container-x relative w-full flex-1 flex flex-col justify-center pt-28">
          <div className="max-w-3xl pb-10 md:pb-0 text-center md:text-left mx-auto md:mx-0">
            <Reveal>
              <p className="flex items-center justify-center md:justify-start gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-gold-2 mb-7">
                <span className="h-px w-8 bg-gold-2/60" />
                {hero.eyebrow}
              </p>
            </Reveal>
            <SplitHeading
              delay={0.1}
              className="font-display font-medium leading-[1.06] tracking-[-0.015em] text-[clamp(1.35rem,5.2vw,3.5rem)]"
              lines={[
                { text: hero.titleLine1 },
                { text: hero.titleLine2, className: "italic text-gold-2" },
              ]}
            />
            <Reveal delay={180}>
              <p className="mt-8 max-w-xl mx-auto md:mx-0 text-lg md:text-xl leading-relaxed text-white/70">
                {hero.introText}{" "}
                <span className="text-white font-medium">
                  {hero.statNumber} <Typewriter words={hero.statWords} />
                </span>{" "}
                {hero.outroText}
              </p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-10 flex justify-center md:justify-start">
                <MagneticButton
                  href="#contacto"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium text-[#1a1206] transition-colors duration-300 hover:bg-gold-2 shadow-[0_18px_44px_-16px_rgba(176,141,76,0.7)]"
                >
                  {hero.ctaText}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Roles */}
        <div className="container-x relative w-full pt-10 md:pt-12 pb-10 md:pb-14">
          <RolesCarousel roles={hero.roles.map((r) => ({ t: r.titulo, d: r.descripcion }))} />
        </div>
      </section>

      {/* ============ EMPRESAS (marquee) ============ */}
      <LogoMarquee
        titulo={empresas.titulo}
        logos={empresas.logos.map((l) => ({ id: l.id, nombre: l.nombre, src: imgSrc(l.logo) }))}
      />

      {/* ============ SERVICIOS ============ */}
      <section id="servicios" className="pt-14 md:pt-16 pb-24 md:pb-28">
        <div className="container-x">
          <Reveal className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-[3rem] leading-[1.12] tracking-[-0.02em] text-balance">
              {servicios.titulo}
            </h2>
            <p className="mt-5 text-ink-2/70 leading-relaxed text-lg">{servicios.descripcion}</p>
          </Reveal>

          <StickyServices
            items={servicios.items.map((s) => ({
              id: s.id,
              numero: s.numero,
              titulo: s.titulo,
              descripcion: s.descripcion,
              tag: s.tag,
              imagenSrc: imgSrc(s.imagen),
            }))}
          />

          <Reveal className="mt-14 md:mt-16 text-center">
            <a href="#contacto" className="btn btn-gold">
              {servicios.ctaText}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA BAND (Reservá llamada) ============ */}
      <section className="pb-16 md:pb-24">
        <div className="container-x grid md:grid-cols-[0.85fr_1.4fr] gap-6 items-stretch">
          {/* Tarjeta gancho + CTA */}
          <div
            className="rounded-3xl p-8 md:p-10 flex flex-col justify-center text-center md:text-left items-center md:items-start"
            style={{ background: "linear-gradient(160deg, rgba(176,141,76,0.18), rgba(176,141,76,0.05))" }}
          >
            <h2 className="font-display text-3xl md:text-[2.65rem] leading-[1.12] tracking-[-0.02em] text-ink text-balance">
              {ctaBand.titulo}
            </h2>
            <p className="mt-5 max-w-sm text-ink-2/75 leading-relaxed">{ctaBand.descripcion}</p>
            <div className="mt-8">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-2"
              >
                {ctaBand.ctaText}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Imagen + testimonio flotante */}
          <div className="relative rounded-3xl overflow-hidden min-h-[340px] md:min-h-[440px]">
            <Image
              src={imgSrc(ctaBand.imagen)}
              alt={ctaBand.imagen.alt}
              fill
              quality={90}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-5 right-5 left-5 md:left-auto md:max-w-xs rounded-2xl bg-white/95 backdrop-blur p-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)]">
              <div className="flex gap-0.5 text-gold mb-2.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-ink-2 leading-relaxed">
                &ldquo;{ctaBand.testimonioTexto}&rdquo;
              </p>
              <div className="mt-3 text-xs text-muted">{ctaBand.testimonioAutor}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ENFOQUE (¿Qué hace que funcione?) ============ */}
      <section id="enfoque" className="relative overflow-hidden bg-navy text-ivory">
        <Image
          src={imgSrc(enfoque.imagenFondo)}
          alt=""
          fill
          quality={90}
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080b11]/92 via-[#080b11]/85 to-[#080b11]/96" />
        <div className="container-x relative pt-24 md:pt-32 pb-24 md:pb-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 text-center md:text-left">
            <Reveal className="max-w-2xl mx-auto md:mx-0">
              <h2 className="font-display text-3xl md:text-[3rem] leading-[1.08] tracking-[-0.02em] text-balance">
                {enfoque.titulo}
              </h2>
              <p className="mt-6 max-w-xl mx-auto md:mx-0 text-white/60 leading-relaxed text-lg">
                {enfoque.descripcion}
              </p>
            </Reveal>
            <Reveal delay={120} className="text-center md:text-left">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)]"
              >
                {enfoque.ctaText}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          </div>

          <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {enfoque.items.map((c, i) => (
              <Reveal key={c.id} delay={i * 90}>
                <SpotlightCard className="group h-full rounded-2xl bg-paper text-ink p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_70px_-24px_rgba(0,0,0,0.75)] text-center sm:text-left">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--gold-soft)] text-gold mb-5 mx-auto sm:mx-0 transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d={iconLibrary[c.icono]} />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg leading-snug relative">{c.titulo}</h3>
                  <p className="mt-2.5 text-sm text-ink-2/70 leading-relaxed relative">{c.descripcion}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOBRE MÍ ============ */}
      <section id="sobre" className="py-24 md:py-32">
        <div className="container-x grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-5 md:sticky md:top-28">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[color:var(--line)] max-w-xs sm:max-w-sm mx-auto md:max-w-none">
                <Image
                  src={imgSrc(sobreMi.foto)}
                  alt={sobreMi.foto.alt}
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7 text-center md:text-left">
            <Reveal>
              <div className="gold-rule mb-8 mx-auto md:mx-0" />
              <h2 className="font-display text-3xl md:text-[2.7rem] leading-tight tracking-[-0.02em] text-balance">
                {sobreMi.titulo}
              </h2>
              <div className="mt-8 space-y-5 text-ink-2/80 leading-relaxed text-[1.05rem]">
                <p>{sobreMi.parrafo1}</p>
                <p>{sobreMi.parrafo2}</p>
              </div>
            </Reveal>

            {/* Certificaciones */}
            {sobreMi.certificaciones.length > 0 && (
              <Reveal className="mt-14">
                <p className="mb-6 font-display text-lg text-ink">Certificaciones</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {sobreMi.certificaciones.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-2xl border border-[color:var(--line)] bg-paper p-5 transition-colors hover:border-[color:var(--gold)] text-left"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--gold-soft)] text-gold">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="5" />
                            <path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5" />
                          </svg>
                        </span>
                        <div>
                          <div className="font-medium text-ink leading-snug">{c.titulo}</div>
                          <div className="text-sm text-muted mt-1.5 leading-relaxed">{c.descripcion}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Credencial destacada — CPA por la CIC */}
            <Reveal className="mt-8">
              <CertificadoCIC
                badgeText={sobreMi.certificadoCIC.badgeText}
                titulo={sobreMi.certificadoCIC.titulo}
                subtitulo={sobreMi.certificadoCIC.subtitulo}
                descripcion={sobreMi.certificadoCIC.descripcion}
                imagenSrc={imgSrc(sobreMi.certificadoCIC.imagen)}
                imagenAlt={sobreMi.certificadoCIC.imagen.alt}
                datos={sobreMi.certificadoCIC.datos}
              />
            </Reveal>

            {/* Otras acreditaciones */}
            {sobreMi.otrasAcreditaciones.length > 0 && (
              <Reveal className="mt-8">
                <p className="mb-5 font-display text-lg text-ink">Otras acreditaciones</p>
                <ul className="space-y-3.5 text-left">
                  {sobreMi.otrasAcreditaciones.map((a) => (
                    <li key={a.id} className="flex items-start gap-3 text-ink-2/80 leading-relaxed">
                      <svg className="mt-1 shrink-0 text-gold" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[0.98rem]">{a.texto}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal className="mt-10">
              <a href="#contacto" className="btn btn-gold">
                {sobreMi.ctaText}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PARA COACHES (navy, comunidad) ============ */}
      <section id="coaches" className="relative bg-navy text-ivory grain overflow-hidden py-24 md:py-32">
        <ShaderBackground />
        <div className="container-x relative z-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 text-center md:text-left">
            <Reveal>
              <h2 className="font-display text-3xl md:text-[2.9rem] leading-tight tracking-[-0.02em]">
                {comunidad.headingPrefix}{" "}
                <span className="italic text-gold-2">
                  {comunidad.statNumber} <Typewriter words={comunidad.statWords} />
                </span>
              </h2>
              <p className="mt-7 max-w-xl text-white/65 leading-relaxed text-lg">
                {comunidad.descripcion}
              </p>
              <ul className="mt-9 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-left max-w-md mx-auto md:max-w-none md:mx-0">
                {comunidad.features.map((f) => (
                  <li key={f.id} className="flex items-start gap-3 text-white/80">
                    <svg className="mt-1 shrink-0 text-gold-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[0.98rem] leading-snug">{f.texto}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <a href="#contacto" className="btn btn-gold">
                  {comunidad.ctaText}
                </a>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={150}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[color:var(--navy-line)] max-w-xs sm:max-w-sm mx-auto md:max-w-none">
                <Image
                  src={imgSrc(comunidad.foto)}
                  alt={comunidad.foto.alt}
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ EVENTOS ============ */}
      <section id="eventos" className="py-24 md:py-32 overflow-hidden">
        <div className="container-x grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Texto + referentes */}
          <div className="min-w-0 text-center md:text-left">
            <Reveal>
              <h2 className="font-display text-3xl md:text-[2.9rem] leading-[1.1] tracking-[-0.02em] text-balance">
                {eventos.titulo}
              </h2>
              <p className="mt-6 max-w-xl text-ink-2/70 leading-relaxed text-lg">{eventos.descripcion}</p>
            </Reveal>

            <Reveal delay={150} className="mt-10">
              <div className="rounded-2xl bg-paper border border-[color:var(--line)] py-6">
                <p className="px-6 text-xs uppercase tracking-[0.24em] text-gold mb-4">
                  {eventos.referentesTitulo}
                </p>
                <Marquee items={eventos.referentes.map((r) => r.nombre)} />
              </div>
            </Reveal>

            <Reveal delay={220} className="mt-8">
              <a href="#contacto" className="btn btn-gold">
                {eventos.ctaText}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Reveal>
          </div>

          {/* Collage asimétrico */}
          <div className="grid grid-cols-2 gap-4">
            {eventos.fotos.map((f, i) => (
              <Reveal key={f.id} delay={i * 100} className={i === 0 ? "col-span-2" : undefined}>
                <EventTile
                  src={imgSrc(f.imagen)}
                  alt={f.imagen.alt}
                  ratio={f.ratio === "wide" ? "aspect-[16/9]" : "aspect-[4/3]"}
                  position={f.ratio === "wide" ? "object-center" : "object-top"}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BANNER (empezar hoy) ============ */}
      <section className="pb-24 md:pb-28">
        <div className="container-x">
          <div
            className="relative overflow-hidden rounded-[2rem] grain"
            style={{ background: "radial-gradient(130% 150% at 0% 0%, #17242f 0%, #0a0e15 55%)" }}
          >
            <ShaderBackground overlayClassName="bg-[#0a0e15]/55" />
            <div className="relative z-10 grid lg:grid-cols-[1.15fr_0.85fr] items-stretch">
              <div className="relative z-10 p-8 md:p-10 lg:p-11 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
                <h2 className="font-display font-medium text-[1.65rem] md:text-[1.9rem] lg:text-[2.15rem] leading-[1.1] tracking-[-0.02em] text-ivory max-w-md mx-auto lg:mx-0">
                  {banner.tituloNormal}{" "}
                  <span className="italic text-gold-2">{banner.tituloAcento}</span>
                </h2>

                {/* Estadística destacada con typewriter */}
                <div className="mt-8 flex items-baseline gap-3 flex-wrap justify-center lg:justify-start">
                  <span className="font-display text-[2.4rem] md:text-5xl leading-none tracking-tight text-gold-2">
                    {banner.statNumber}
                  </span>
                  <span className="font-display text-xl md:text-2xl italic text-ivory/90">
                    <Typewriter words={banner.statWords} />
                  </span>
                </div>

                {/* Estadísticas de apoyo — fila */}
                <div className="mt-7 grid grid-cols-3 max-w-md mx-auto lg:mx-0">
                  {banner.stats.map((s, i) => (
                    <div key={s.id} className={i > 0 ? "pl-5 border-l border-[color:var(--navy-line)]" : ""}>
                      <span className="block font-display text-2xl md:text-3xl leading-none tracking-tight text-gold-2">
                        {s.numero}
                      </span>
                      <div className="mt-2 text-xs text-white/55 leading-snug">{s.etiqueta}</div>
                    </div>
                  ))}
                </div>

                <a
                  href="#contacto"
                  className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)]"
                >
                  {banner.ctaText}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
              <div className="relative min-h-[280px] md:min-h-[360px]">
                <div
                  className="absolute bottom-0 left-1/2 h-3/4 w-4/5 -translate-x-1/2 rounded-full blur-3xl opacity-25"
                  style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
                />
                <Image
                  src={imgSrc(banner.imagen)}
                  alt={banner.imagen.alt}
                  fill
                  priority={false}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIOS ============ */}
      <section className="py-24 md:py-32 bg-paper border-y border-[color:var(--line-2)]">
        <div className="container-x">
          <Reveal>
            <Testimonials
              titulo={testimonios.titulo}
              descripcion={testimonios.descripcion}
              items={testimonios.items.map((t) => ({ q: t.cita, a: t.autor, r: t.rol }))}
            />
          </Reveal>
        </div>
      </section>

      {/* ============ CONTACTO (CTA final, navy) ============ */}
      <section id="contacto" className="relative bg-navy text-ivory grain overflow-hidden py-24 md:py-32">
        <ShaderBackground overlayClassName="bg-[#080b11]/52" />
        <div className="container-x relative z-10 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal className="text-center lg:text-left">
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-[-0.02em] text-balance">
              {contacto.titulo}
            </h2>
            <p className="mt-6 max-w-md text-white/65 leading-relaxed text-lg">{contacto.descripcion}</p>
            <div className="mt-9 space-y-3 text-white/75 flex flex-col items-center lg:items-start">
              <a href={`mailto:${global.email}`} className="flex items-center gap-3 hover:text-gold-2 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
                </svg>
                {global.email}
              </a>
              <a
                href={waLink(global.whatsappDefaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-gold-2 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.3 7.3 0 01-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11 11 0 004.3 3.8c1.6.7 1.9.6 2.3.5a2.5 2.5 0 001.6-1.1 2 2 0 00.1-1.1c0-.1-.2-.2-.4-.3z" />
                </svg>
                Contactar por WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm whatsappNumber={global.whatsappNumber} />
          </Reveal>
        </div>
      </section>

      <Footer
        bio={footer.bio}
        serviciosNombres={servicios.items.map((s) => s.titulo)}
        whatsappUrl={waLink(global.whatsappDefaultMessage)}
        email={global.email}
        cicBadgeLinea1={footer.cicBadgeLinea1}
        cicBadgeLinea2={footer.cicBadgeLinea2}
        cicImagenSrc={imgSrc(footer.cicImagen)}
        cicImagenAlt={footer.cicImagen.alt}
        ubicacion={footer.ubicacion}
      />

      <FloatingAssistant whatsappNumber={global.whatsappNumber} whatsappMessage={global.whatsappDefaultMessage} />
      <ScrollToTop />
    </main>
  );
}
