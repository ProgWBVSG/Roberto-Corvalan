"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const WHATSAPP_URL = "https://wa.me/000000000";

const faqs = [
  {
    q: "¿Las sesiones son presenciales o virtuales?",
    a: "Ambas modalidades. Elegimos la que mejor se adapte a vos o a tu equipo.",
  },
  {
    q: "¿Cuánto dura un proceso de coaching?",
    a: "Varía según el objetivo. Lo definimos juntos en una primera llamada, sin cargo.",
  },
  {
    q: "¿Trabajás solo con ejecutivos?",
    a: "No. Acompaño a ejecutivos, equipos completos y también formo y mentoreo a coaches.",
  },
  {
    q: "¿Cómo sé si esto es para mí?",
    a: "Si sentís que tu liderazgo llegó a un techo o necesitás claridad para el próximo paso, es un buen punto de partida.",
  },
  {
    q: "¿Cómo empiezo?",
    a: "Reservás una llamada de 30 minutos sin cargo y desde ahí trazamos el camino juntos.",
  },
];

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(0);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHint(true), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Botón FAQ + panel anclado exactamente arriba de él */}
      <div className="relative">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-full right-0 mb-3 z-10 flex w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-[color:var(--navy-line)] bg-navy text-ivory shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]"
            >
              {/* Header */}
              <div className="relative shrink-0 p-5 pb-4 border-b border-[color:var(--navy-line)]">
                <p className="eyebrow mb-1.5">Asistente virtual</p>
                <h3 className="font-display text-lg leading-snug pr-6">
                  ¿En qué te puedo ayudar?
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Preguntas */}
              <div className="max-h-[42vh] overflow-y-auto px-2 py-2">
                {faqs.map((f, i) => (
                  <div key={f.q} className="border-b border-[color:var(--navy-line)] last:border-none">
                    <button
                      onClick={() => setActive(active === i ? null : i)}
                      className="w-full flex items-center justify-between gap-3 text-left px-3 py-3.5 text-sm text-white/85 hover:text-gold-2 transition-colors"
                    >
                      {f.q}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`shrink-0 transition-transform duration-300 ${active === i ? "rotate-180 text-gold" : "text-white/30"}`}
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    {active === i && (
                      <p className="px-3 pb-3.5 text-sm text-white/55 leading-relaxed">{f.a}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="shrink-0 p-4 border-t border-[color:var(--navy-line)] bg-white/[0.02]">
                <p className="text-xs text-white/40 mb-3">¿Preferís hablar directo?</p>
                <div className="flex gap-2">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-[color:var(--navy-line)] px-3 py-2.5 text-xs font-medium text-white/80 hover:border-gold hover:text-gold-2 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="#contacto"
                    onClick={() => setOpen(false)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gold px-3 py-2.5 text-xs font-medium text-[#1a1206] hover:bg-gold-2 transition-colors"
                  >
                    Agendar llamada
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint bubble */}
        <AnimatePresence>
          {hint && !open && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => {
                setOpen(true);
                setHint(false);
              }}
              className="absolute bottom-full right-0 mb-3 z-10 whitespace-nowrap rounded-full bg-paper border border-[color:var(--line)] px-4 py-2 text-xs text-ink-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
            >
              ¿Tenés dudas? Preguntame
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            setOpen((v) => !v);
            setHint(false);
          }}
          aria-label="Preguntas frecuentes"
          className="relative flex h-[3.25rem] w-[3.25rem] sm:h-14 sm:w-14 items-center justify-center rounded-full bg-navy text-gold-2 border border-[color:var(--navy-line)] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:scale-105"
        >
          {!open && <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-gold animate-pulse" />}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 3.5" />
                <path d="M12 17h.01" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Botón WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
        className="flex h-[3.25rem] w-[3.25rem] sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-14px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-105"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.3 7.3 0 01-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11 11 0 004.3 3.8c1.6.7 1.9.6 2.3.5a2.5 2.5 0 001.6-1.1 2 2 0 00.1-1.1c0-.1-.2-.2-.4-.3z" />
        </svg>
      </a>
    </div>
  );
}
