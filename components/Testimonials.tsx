"use client";

import { useEffect, useState } from "react";

type Item = { q: string; a: string; r: string };

export default function Testimonials({ items }: { items: Item[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [items.length]);

  const t = items[i];
  const initials = t.a
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
      {/* Izquierda: título */}
      <div>
        <p className="eyebrow mb-5">Testimonios</p>
        <h2 className="font-display text-3xl md:text-[2.9rem] leading-[1.1] tracking-[-0.02em] text-balance">
          Historias reales de líderes y coaches que acompañé.
        </h2>
        <p className="mt-6 max-w-sm text-ink-2/70 leading-relaxed">
          Cada una es un camino único, guiado por claridad, método y el coraje de crecer.
        </p>
      </div>

      {/* Derecha: testimonio */}
      <div>
        <div key={i} className="t-fade">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-navy font-display text-lg text-gold-2">
            {initials}
          </div>
          <blockquote className="font-display text-2xl md:text-[1.85rem] leading-[1.4] text-ink">
            &ldquo;{t.q}&rdquo;
          </blockquote>
          <div className="mt-7">
            <div className="font-medium text-ink">{t.a}</div>
            <div className="text-sm text-muted">{t.r}</div>
          </div>
        </div>

        {/* Puntitos */}
        <div className="mt-9 flex gap-2.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Ver testimonio ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === i ? "w-7 bg-ink" : "w-2.5 bg-[color:var(--line)] hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
