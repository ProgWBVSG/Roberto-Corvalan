"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#sobre", label: "Sobre mí" },
  { href: "#enfoque", label: "Enfoque" },
  { href: "#coaches", label: "Coaches" },
  { href: "#servicios", label: "Servicios" },
  { href: "#eventos", label: "Eventos" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/roberto.corvalan.coach/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/roberto-c-corvalan-coach-profesional-649749a4/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4 md:pt-6">
      <div className="container-x relative flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#top"
          className={`font-display text-lg md:text-xl tracking-tight transition-colors duration-500 ${
            scrolled ? "text-ink" : "text-ivory"
          }`}
        >
          Roberto&nbsp;Corvalán
        </a>

        {/* Center floating pill nav */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5 bg-[#0c0e13]/65 border border-white/10 backdrop-blur-xl shadow-[0_12px_36px_-14px_rgba(0,0,0,0.65)]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm text-white/65 hover:text-white hover:bg-white/10 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: redes + CTA */}
        <div className="hidden md:flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-500 ${
                scrolled
                  ? "border-[color:var(--line)] text-ink-2 hover:border-[color:var(--gold)] hover:text-gold"
                  : "border-white/20 text-white/70 hover:border-gold-2 hover:text-gold-2"
              }`}
            >
              {s.icon}
            </a>
          ))}

          <a
            href="#contacto"
            className={`ml-1 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-500 hover:-translate-y-0.5 ${
              scrolled
                ? "bg-ink text-ivory hover:bg-ink-2 shadow-[0_10px_30px_-10px_rgba(20,23,30,0.5)]"
                : "bg-white text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:bg-white/90"
            }`}
          >
            Agendá tu sesión
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden flex flex-col gap-1.5 p-2 rounded-full ${
            scrolled ? "text-ink" : "text-ivory"
          }`}
        >
          <span className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden mx-4 mt-3 overflow-hidden rounded-3xl transition-all duration-500 ${
          open
            ? "max-h-96 bg-[color:var(--ivory)]/95 backdrop-blur-xl border border-[color:var(--line)] shadow-2xl"
            : "max-h-0"
        }`}
      >
        <div className="p-5 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-ink-2 hover:bg-[color:var(--ink)]/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory"
          >
            Agendá tu sesión
          </a>

          <div className="mt-4 flex items-center justify-center gap-3 border-t border-[color:var(--line-2)] pt-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] text-ink-2 transition-colors hover:border-[color:var(--gold)] hover:text-gold"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
