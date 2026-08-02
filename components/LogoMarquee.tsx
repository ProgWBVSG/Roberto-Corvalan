"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

type Logo = { id: string; nombre: string; src: string };

export default function LogoMarquee({
  titulo,
  logos,
}: {
  titulo: string;
  logos: Logo[];
}) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const loop = logos.length ? [...logos, ...logos] : [];

  return (
    <section className="py-14 md:py-16 border-y border-[color:var(--line-2)]">
      <div className="container-x">
        <p className="text-center text-xs uppercase tracking-[0.22em] text-muted mb-9">
          {titulo}
        </p>
      </div>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-6 group-hover:[animation-play-state:paused]">
          {loop.map((c, i) => (
            <button
              key={`${c.id}-${i}`}
              type="button"
              onClick={() => setZoom({ src: c.src, alt: c.nombre })}
              aria-label={`Ampliar logo: ${c.nombre}`}
              className="flex h-20 w-40 shrink-0 cursor-zoom-in items-center justify-center rounded-xl border border-[color:var(--line)] bg-white p-4 transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-full w-full">
                <Image
                  src={c.src}
                  alt={c.nombre}
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox src={zoom?.src ?? null} alt={zoom?.alt ?? ""} onClose={() => setZoom(null)} />
    </section>
  );
}
