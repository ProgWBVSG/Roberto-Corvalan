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

type Lut = { ts: Float64Array; ls: Float64Array; total: number };

/** Tabla de arco: permite repartir los ítems por distancia real y no por ángulo. */
function buildLut(rx: number, ry: number): Lut {
  const N = 720;
  const ts = new Float64Array(N + 1);
  const ls = new Float64Array(N + 1);
  let total = 0;
  let px = rx;
  let py = 0;
  for (let i = 1; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const x = Math.cos(t) * rx;
    const y = Math.sin(t) * ry;
    total += Math.hypot(x - px, y - py);
    ts[i] = t;
    ls[i] = total;
    px = x;
    py = y;
  }
  return { ts, ls, total };
}

/** Devuelve el ángulo correspondiente a una distancia de arco. */
function angleAtArc(lut: Lut, s: number) {
  let target = s % lut.total;
  if (target < 0) target += lut.total;
  let lo = 0;
  let hi = lut.ls.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (lut.ls[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  const i = Math.max(1, lo);
  const l0 = lut.ls[i - 1];
  const l1 = lut.ls[i];
  const f = l1 === l0 ? 0 : (target - l0) / (l1 - l0);
  return lut.ts[i - 1] + (lut.ts[i] - lut.ts[i - 1]) * f;
}

export default function CompanyOrbit() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGEllipseElement>(null);
  const ring2Ref = useRef<SVGEllipseElement>(null);
  const ring3Ref = useRef<SVGEllipseElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const dist = useRef(0);
  const paused = useRef(false);
  const hovered = useRef<number | null>(null);
  const hoverAmt = useRef<number[]>(companies.map(() => 0));
  const dims = useRef({ w: 0, h: 0, rx: 0, ry: 0, lut: null as Lut | null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const measure = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w === dims.current.w && h === dims.current.h) return;
      const pad = w < 640 ? 48 : 72;
      const rx = Math.max(w / 2 - pad, 40);
      const ry = Math.max(h / 2 - pad, 28);
      dims.current = { w, h, rx, ry, lut: buildLut(rx, ry) };

      const setRing = (el: SVGEllipseElement | null, fx: number, fy: number) => {
        if (!el) return;
        el.setAttribute("cx", String(w / 2));
        el.setAttribute("cy", String(h / 2));
        el.setAttribute("rx", String(rx * fx));
        el.setAttribute("ry", String(ry * fy));
      };
      setRing(ringRef.current, 1, 1);
      setRing(ring2Ref.current, 0.72, 0.62);
      setRing(ring3Ref.current, 0.44, 0.3);
    };

    const place = (dt: number) => {
      measure();
      const { rx, ry, lut } = dims.current;
      if (!lut) return;

      itemsRef.current.forEach((node, i) => {
        if (!node) return;
        // repartidos por distancia de arco -> espaciado parejo y velocidad constante
        const s = dist.current + (i / companies.length) * lut.total;
        const t = angleAtArc(lut, s);
        const x = Math.cos(t) * rx;
        const y = Math.sin(t) * ry;
        const depth = (Math.sin(t) + 1) / 2; // 0 = atrás, 1 = adelante

        const target = hovered.current === i ? 1 : 0;
        hoverAmt.current[i] += (target - hoverAmt.current[i]) * Math.min(1, dt * 12);
        const hv = hoverAmt.current[i];

        const scale = (0.82 + depth * 0.26) * (1 + hv * 0.3);
        node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
        node.style.opacity = String(Math.min(1, 0.5 + depth * 0.5 + hv * 0.5));
        node.style.zIndex = String(Math.round(depth * 10) + (hv > 0.05 ? 30 : 0));
      });
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!paused.current) dist.current -= dt * 45; // px por segundo
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
      className={`relative mx-auto h-[250px] w-full max-w-5xl sm:h-[280px] transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Resplandor central */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(176,141,76,0.2), rgba(28,58,107,0.08) 55%, transparent 75%)",
        }}
      />

      {/* Anillos concéntricos (esfera de brújula) */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <ellipse
          ref={ringRef}
          fill="none"
          stroke="#B08D4C"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="2 7"
          strokeLinecap="round"
        />
        <ellipse
          ref={ring2Ref}
          fill="none"
          stroke="#B08D4C"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        <ellipse
          ref={ring3Ref}
          fill="none"
          stroke="#B08D4C"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
      </svg>

      {/* Texto central */}
      <div className="pointer-events-none absolute left-1/2 top-[44%] z-20 w-[13rem] -translate-x-1/2 -translate-y-1/2 text-center sm:w-auto">
        {/* Velo que esfuma los círculos al pasar detrás del texto */}
        <div
          className="absolute -inset-x-16 -inset-y-10"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--ivory) 38%, rgba(246,242,234,0.75) 60%, transparent 78%)",
          }}
        />
        <svg
          className="relative mx-auto mb-4 h-4 w-4 text-gold"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
        </svg>
        <h2 className="relative font-display font-medium text-[1.6rem] leading-[1.12] tracking-[-0.02em] text-ink sm:whitespace-nowrap sm:text-[2.6rem]">
          Empresas que <span className="italic text-gold">confían</span> en mí
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
          className="group absolute left-1/2 top-1/2 flex w-16 cursor-pointer flex-col items-center gap-2 sm:w-24"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-paper font-display text-xs text-gold shadow-[0_12px_28px_-12px_rgba(20,23,30,0.35)] transition-colors duration-300 group-hover:border-[color:var(--gold)] group-hover:shadow-[0_16px_36px_-12px_rgba(176,141,76,0.5)] sm:h-20 sm:w-20 sm:text-lg">
            {c.logo}
          </div>
          <span className="whitespace-nowrap text-center text-[8px] uppercase tracking-[0.16em] text-ink-2/55 transition-colors duration-300 group-hover:text-gold sm:text-[10px]">
            {c.name}
          </span>
        </div>
      ))}
    </div>
  );
}
