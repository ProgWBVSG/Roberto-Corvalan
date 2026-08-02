"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";

type Foto = { id: string; src: string; alt: string; ratio: "wide" | "square" };

export default function EventGallery({ fotos }: { fotos: Foto[] }) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {fotos.map((f, i) => (
          <Reveal key={f.id} delay={i * 100} className={i === 0 ? "col-span-2" : undefined}>
            <button
              type="button"
              onClick={() => setZoom({ src: f.src, alt: f.alt })}
              aria-label={`Ampliar foto: ${f.alt}`}
              className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-[color:var(--line)] ${
                f.ratio === "wide" ? "aspect-[16/9]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                quality={90}
                sizes="(max-width: 768px) 90vw, 45vw"
                className={`object-cover ${
                  f.ratio === "wide" ? "object-center" : "object-top"
                } transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105`}
              />
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-colors duration-500 group-hover:ring-[color:var(--gold)]/40" />
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox src={zoom?.src ?? null} alt={zoom?.alt ?? ""} onClose={() => setZoom(null)} />
    </>
  );
}
