"use client";

import Image from "next/image";

const servicios = [
  {
    n: "01",
    t: "Coaching Ejecutivo 1:1",
    d: "Sesiones individuales y confidenciales para clarificar objetivos, fortalecer competencias y tomar mejores decisiones, con un plan de acción concreto.",
    img: "/servicios/coaching.png",
    tag: "Individual · Confidencial",
  },
  {
    n: "02",
    t: "Talleres para Equipos",
    d: "Talleres in-company a medida para desarrollar liderazgo, mejorar la productividad y consolidar equipos de alto rendimiento.",
    img: "/servicios/talleres.png",
    tag: "In-company · A medida",
  },
  {
    n: "03",
    t: "Conferencias",
    d: "Charlas sobre liderazgo, cambio y transformación personal y organizacional, con herramientas aplicables desde el primer día.",
    img: "/servicios/conferencias.png",
    tag: "Presencial · Virtual",
  },
  {
    n: "04",
    t: "Consultoría Organizacional",
    d: "Diagnóstico y acompañamiento para alinear cultura, propósito y estrategia, elevando el bienestar y el desempeño del equipo.",
    img: "/servicios/consultoria.png",
    tag: "Cultura · Estrategia",
  },
];

export default function StickyServices() {
  return (
    <div className="mt-14 md:mt-20">
      {servicios.map((s, i) => (
        <div
          key={s.n}
          className="sticky top-24 md:top-28 pb-6 md:pb-8 last:pb-0"
        >
          <div className="relative grid overflow-hidden rounded-[1.75rem] md:rounded-[2rem] border border-[color:var(--navy-line)] bg-navy shadow-[0_36px_90px_-46px_rgba(0,0,0,0.85)] md:grid-cols-2">
            {/* Texto */}
            <div className="order-2 md:order-1 flex flex-col justify-center p-8 md:p-11 lg:p-14 text-center md:text-left items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="font-display text-[2.6rem] md:text-5xl leading-none text-[color:var(--gold-2)]">
                  {s.n}
                </span>
                <span className="h-px w-10 bg-[color:var(--navy-line)]" />
                <span className="text-[0.68rem] uppercase tracking-[0.2em] text-white/45">
                  {s.tag}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[1.7rem] md:text-[2.3rem] leading-[1.1] tracking-[-0.02em] text-ivory">
                {s.t}
              </h3>

              <p className="mt-4 max-w-md mx-auto md:mx-0 text-[0.98rem] md:text-base leading-relaxed text-white/60">
                {s.d}
              </p>

              <a
                href="#contacto"
                className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-[color:var(--gold-2)] transition-colors hover:text-ivory"
              >
                Quiero saber más
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* Imagen */}
            <div className="order-1 md:order-2 relative min-h-[220px] sm:min-h-[280px] md:min-h-0">
              <Image
                src={s.img}
                alt={s.t}
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Fundido hacia el panel de texto para integrar imagen y card */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-navy" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
