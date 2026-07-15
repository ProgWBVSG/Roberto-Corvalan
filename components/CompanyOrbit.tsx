"use client";

import { useEffect, useRef, useState } from "react";

// Empresas ficticias — reemplazar por las reales (logo + nombre)
const companies = [
  { name: "Grupo Andes", logo: "GA" },
  { name: "Nexo Consultora", logo: "NC" },
  { name: "Vértice Group", logo: "VG" },
  { name: "Altamira", logo: "AL" },
  { name: "Praxis Consulting", logo: "PX" },
  { name: "Delta Logística", logo: "DL" },
  { name: "Rivera & Asoc.", logo: "RA" },
  { name: "Origen Salud", logo: "OS" },
  { name: "Meridiano", logo: "MD" },
  { name: "Kaizen Corp", logo: "KZ" },
];

export default function CompanyOrbit() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const angle = useRef(0);
  const paused = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const place = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const pad = w < 640 ? 52 : 76;
      const rx = Math.max(w / 2 - pad, 40);
      const ry = Math.max(h / 2 - pad, 30);

      itemsRef.current.forEach((node, i) => {
        if (!node) return;
        const t = angle.current + (i / companies.length) * Math.PI * 2;
        const x = Math.cos(t) * rx;
        const y = Math.sin(t) * ry;
        // depth: 0 = atrás (arriba), 1 = adelante (abajo)
        const depth = (Math.sin(t) + 1) / 2;
        const scale = 0.72 + depth * 0.36;
        node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
        node.style.opacity = String(0.45 + depth * 0.55);
        node.style.zIndex = String(Math.round(depth * 10));
      });
    };

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused.current) angle.current -= dt * 0.16;
      place();
      raf = requestAnimationFrame(loop);
    };

    place();
    setReady(true);
    if (!reduce) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(place);
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      className={`relative mx-auto h-[360px] w-full max-w-4xl sm:h-[430px] transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Texto central */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[14rem] -translate-x-1/2 -translate-y-1/2 text-center sm:w-80">
        <p className="eyebrow mb-3">Confianza</p>
        <h2 className="font-display text-2xl leading-tight tracking-[-0.01em] text-balance sm:text-[2.1rem]">
          Empresas que confían en mí
        </h2>
      </div>

      {/* Órbita */}
      {companies.map((c, i) => (
        <div
          key={c.name}
          ref={(el) => {
            itemsRef.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 flex w-20 flex-col items-center gap-2 sm:w-24"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--line)] bg-paper font-display text-sm text-gold shadow-[0_10px_24px_-10px_rgba(20,23,30,0.3)] sm:h-16 sm:w-16 sm:text-base">
            {c.logo}
          </div>
          <span className="text-center text-[10px] leading-tight text-ink-2/60 sm:text-[11px]">
            {c.name}
          </span>
        </div>
      ))}
    </div>
  );
}
