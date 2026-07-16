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
  const hovered = useRef<number | null>(null);
  const hoverAmt = useRef<number[]>(companies.map(() => 0));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const place = (dt: number) => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      const pad = w < 640 ? 46 : 74;
      const rx = Math.max(w / 2 - pad, 40);
      const ry = Math.max(h / 2 - pad, 28);

      itemsRef.current.forEach((node, i) => {
        if (!node) return;
        const t = angle.current + (i / companies.length) * Math.PI * 2;
        const x = Math.cos(t) * rx;
        const y = Math.sin(t) * ry;
        // depth: 0 = atrás (arriba), 1 = adelante (abajo)
        const depth = (Math.sin(t) + 1) / 2;

        // hover suavizado
        const target = hovered.current === i ? 1 : 0;
        hoverAmt.current[i] += (target - hoverAmt.current[i]) * Math.min(1, dt * 12);
        const hv = hoverAmt.current[i];

        const scale = (0.8 + depth * 0.28) * (1 + hv * 0.32);
        node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
        node.style.opacity = String(Math.min(1, 0.5 + depth * 0.5 + hv * 0.5));
        node.style.zIndex = String(Math.round(depth * 10) + (hv > 0.05 ? 30 : 0));
      });
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!paused.current) angle.current -= dt * 0.16;
      place(dt);
      raf = requestAnimationFrame(loop);
    };

    place(0);
    setReady(true);
    if (!reduce) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => place(0));
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
      onMouseLeave={() => {
        paused.current = false;
        hovered.current = null;
      }}
      className={`relative mx-auto h-[300px] w-full max-w-5xl sm:h-[340px] transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Texto central */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[11rem] -translate-x-1/2 -translate-y-1/2 text-center sm:w-auto">
        <h2 className="font-display text-xl leading-tight tracking-[-0.01em] sm:whitespace-nowrap sm:text-[2.1rem]">
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
          onMouseEnter={() => (hovered.current = i)}
          onMouseLeave={() => (hovered.current = null)}
          className="absolute left-1/2 top-1/2 flex w-16 cursor-pointer flex-col items-center gap-2 sm:w-24"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-paper font-display text-xs text-gold shadow-[0_10px_24px_-10px_rgba(20,23,30,0.3)] sm:h-20 sm:w-20 sm:text-lg">
            {c.logo}
          </div>
          <span className="text-center text-[9px] leading-tight text-ink-2/60 sm:text-[11px]">
            {c.name}
          </span>
        </div>
      ))}
    </div>
  );
}
