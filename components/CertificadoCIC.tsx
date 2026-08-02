"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

type Dato = { id: string; etiqueta: string; valor: string };
type Asociacion = { id: string; nombre: string; logoSrc: string };
type Credencial = { id: string; src: string; alt: string };

export default function CertificadoCIC({
  badgeText,
  titulo,
  subtitulo,
  descripcion,
  credenciales,
  datos,
  asociacionesTitulo,
  asociaciones,
}: {
  badgeText: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  credenciales: Credencial[];
  datos: Dato[];
  asociacionesTitulo: string;
  asociaciones: Asociacion[];
}) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const [slide, setSlide] = useState(0);
  const loop = asociaciones.length ? [...asociaciones, ...asociaciones] : [];
  const total = credenciales.length;

  // Rotación automática del carrusel de credenciales
  useEffect(() => {
    if (total <= 1 || zoom) return;
    const id = setInterval(() => setSlide((v) => (v + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total, zoom]);

  const actual = credenciales[slide] ?? credenciales[0];

  return (
    <>
      <div
        className="relative overflow-hidden rounded-3xl border border-[color:var(--navy-line)] bg-navy text-ivory"
        style={{
          backgroundImage:
            "radial-gradient(120% 130% at 100% 0%, rgba(176,141,76,0.16) 0%, transparent 55%)",
        }}
      >
        <div className="grid gap-6 p-5 sm:p-7 md:p-9 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-center md:gap-9">
          {/* Carrusel de credenciales */}
          <div className="mx-auto w-full max-w-[160px] sm:max-w-[190px] md:max-w-[220px] min-w-0">
            <div className="relative aspect-[853/1280] overflow-hidden rounded-xl border border-[color:var(--gold)]/35 shadow-[0_26px_60px_-24px_rgba(0,0,0,0.85)]">
              {credenciales.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setZoom({ src: c.src, alt: c.alt })}
                  aria-label={`Ampliar: ${c.alt}`}
                  aria-hidden={i !== slide}
                  tabIndex={i === slide ? 0 : -1}
                  className={`absolute inset-0 cursor-zoom-in transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    i === slide ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <Image
                    src={c.src}
                    alt={c.alt}
                    fill
                    quality={90}
                    sizes="220px"
                    className="object-cover"
                  />
                </button>
              ))}
              <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
            </div>

            {/* Indicadores */}
            {total > 1 && (
              <div className="mt-3 flex justify-center gap-2">
                {credenciales.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSlide(i)}
                    aria-label={`Ver credencial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === slide ? "w-5 bg-gold-2" : "w-1.5 bg-white/25 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setZoom({ src: actual.src, alt: actual.alt })}
              className="group mt-2.5 flex w-full items-center justify-center gap-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-gold-2"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" strokeLinecap="round" />
              </svg>
              Ampliar
            </button>
          </div>

          {/* Detalle */}
          <div className="text-center md:text-left min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/35 bg-[color:var(--gold-soft)] px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-gold-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {badgeText}
            </span>

            <h3 className="mt-4 font-display text-[1.55rem] sm:text-[1.85rem] leading-[1.15] tracking-[-0.02em]">
              {titulo}
              <span className="text-gold-2"> {subtitulo}</span>
            </h3>

            <p className="mt-3.5 text-[0.98rem] leading-relaxed text-white/60 max-w-md mx-auto md:mx-0">
              {descripcion}
            </p>

            <dl className="mt-6 grid grid-cols-1 xs:grid-cols-2 gap-x-6 gap-y-4 sm:gap-y-5 text-left max-w-md mx-auto md:mx-0">
              {datos.map((d) => (
                <div key={d.id} className="border-l border-[color:var(--gold)]/25 pl-3.5">
                  <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-white/35">
                    {d.etiqueta}
                  </dt>
                  <dd className="mt-1 text-[0.92rem] font-medium leading-snug text-ivory">
                    {d.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Carrusel de asociaciones */}
        {asociaciones.length > 0 && (
          <div className="border-t border-[color:var(--navy-line)] px-5 py-5 sm:px-7 md:px-9 sm:py-6">
            <p className="mb-4 text-center text-[0.68rem] uppercase tracking-[0.18em] text-white/35 md:text-left">
              {asociacionesTitulo}
            </p>
            <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max animate-[marquee_20s_linear_infinite] items-center gap-5 group-hover:[animation-play-state:paused]">
                {loop.map((a, i) => (
                  <button
                    key={`${a.id}-${i}`}
                    type="button"
                    onClick={() => setZoom({ src: a.logoSrc, alt: a.nombre })}
                    aria-label={`Ampliar logo: ${a.nombre}`}
                    className="flex h-12 w-28 sm:h-14 sm:w-32 shrink-0 cursor-zoom-in items-center justify-center rounded-lg border border-[color:var(--navy-line)] bg-white p-2 sm:p-2.5 transition-transform duration-300 hover:scale-105"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={a.logoSrc}
                        alt={a.nombre}
                        fill
                        sizes="128px"
                        className="object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Lightbox src={zoom?.src ?? null} alt={zoom?.alt ?? ""} onClose={() => setZoom(null)} />
    </>
  );
}
