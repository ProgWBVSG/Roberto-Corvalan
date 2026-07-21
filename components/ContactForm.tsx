"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type FieldKey = "nombre" | "email" | "perfil" | "mensaje";

type Step = {
  key: FieldKey;
  eyebrow: string;
  question: string;
  hint: string;
  type: "text" | "email" | "textarea" | "choice";
  placeholder?: string;
  options?: string[];
};

const steps: Step[] = [
  {
    key: "nombre",
    eyebrow: "Empecemos",
    question: "¿Cómo te llamás?",
    hint: "Así de simple: tu nombre para empezar la conversación.",
    type: "text",
    placeholder: "Tu nombre",
  },
  {
    key: "email",
    eyebrow: "Contacto",
    question: "¿A qué correo te escribo?",
    hint: "Respondo personalmente en un plazo de 48 h hábiles.",
    type: "email",
    placeholder: "tu@email.com",
  },
  {
    key: "perfil",
    eyebrow: "Sobre vos",
    question: "¿A qué te dedicás?",
    hint: "Elegí la opción que mejor te describe.",
    type: "choice",
    options: [
      "Ejecutivo / Directivo",
      "Dueño de empresa / Emprendedor",
      "Coach o en formación",
      "Profesional independiente",
    ],
  },
  {
    key: "mensaje",
    eyebrow: "Tu objetivo",
    question: "¿En qué querés que te ayude?",
    hint: "Contame brevemente tu situación o qué te gustaría transformar.",
    type: "textarea",
    placeholder: "Escribí lo que tengas en mente…",
  },
];

const WHATSAPP_NUMBER = "5491136830740";

function isValid(step: Step, value: string): boolean {
  const v = value.trim();
  if (v.length === 0) return false;
  if (step.type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  return true;
}

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.3 7.3 0 01-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1 4.9 4.9 0 001 2.6 11 11 0 004.3 3.8c1.6.7 1.9.6 2.3.5a2.5 2.5 0 001.6-1.1 2 2 0 00.1-1.1c0-.1-.2-.2-.4-.3z" />
  </svg>
);

export default function ContactForm() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [otroMode, setOtroMode] = useState(false);
  const [hp, setHp] = useState(""); // honeypot anti-spam
  const [data, setData] = useState<Record<FieldKey, string>>({
    nombre: "",
    email: "",
    perfil: "",
    mensaje: "",
  });

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const step = steps[current];
  const value = data[step.key];
  const valid = isValid(step, value);
  const isLast = current === steps.length - 1;

  useEffect(() => {
    if (step.type === "choice" && !otroMode) return;
    const t = setTimeout(() => inputRef.current?.focus(), 260);
    return () => clearTimeout(t);
  }, [current, otroMode, step.type]);

  function go(next: number) {
    setDir(next > current ? 1 : -1);
    setTouched(false);
    setCurrent(next);
  }

  function submitLead() {
    // Guarda la consulta en la base (no bloquea la UX; WhatsApp funciona igual).
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: data.nombre,
        email: data.email,
        perfil: data.perfil,
        mensaje: data.mensaje,
        website: hp,
      }),
    }).catch(() => {});
  }

  function handleNext() {
    if (!valid) {
      setTouched(true);
      return;
    }
    if (isLast) {
      submitLead();
      setSent(true);
    } else {
      go(current + 1);
    }
  }

  function whatsappHref() {
    const texto =
      `Hola Roberto, soy ${data.nombre}.\n` +
      `Me dedico a: ${data.perfil}.\n` +
      `Quisiera que me ayudes con: ${data.mensaje}\n` +
      `Mi email: ${data.email}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && step.type !== "textarea") {
      e.preventDefault();
      handleNext();
    }
    if (e.key === "Enter" && step.type === "textarea" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleNext();
    }
  }

  function pickOption(opt: string) {
    setOtroMode(false);
    setData((d) => ({ ...d, perfil: opt }));
    setTouched(false);
  }

  function pickOtro() {
    setOtroMode(true);
    setData((d) => ({ ...d, perfil: "" }));
    setTouched(false);
  }

  const progress = ((current + (sent ? 1 : 0)) / steps.length) * 100;

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-[color:var(--navy-line)] backdrop-blur-sm p-7 md:p-9 min-h-[440px] flex flex-col">
      {/* Honeypot anti-spam (oculto a usuarios reales) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {/* Progreso */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-2"
            initial={false}
            animate={{ width: `${sent ? 100 : progress}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <span className="text-xs tabular-nums text-white/40">
          {sent ? steps.length : current + 1}/{steps.length}
        </span>
      </div>

      {sent ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-1 flex-col items-start justify-center"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--gold-soft)] text-gold-2">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3 className="font-display text-2xl md:text-3xl text-ivory leading-tight">
            ¡Gracias, {data.nombre.split(" ")[0]}!
          </h3>
          <p className="mt-3 max-w-sm text-white/60 leading-relaxed">
            Último paso: envià tu mensaje por WhatsApp y te respondo personalmente. Ya lo dejé
            listo con tus datos.
          </p>

          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-4 font-medium text-[#04220f] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a] shadow-[0_16px_38px_-14px_rgba(37,211,102,0.6)]"
          >
            <WhatsAppIcon size={20} />
            Contactar por WhatsApp
          </a>

          <p className="mt-5 text-sm text-white/45">
            ¿Preferís email? Escribime a{" "}
            <a href="mailto:hola@robertocorvalan.com" className="text-gold-2 hover:underline">
              hola@robertocorvalan.com
            </a>
          </p>

          <button
            type="button"
            onClick={() => {
              setSent(false);
              setOtroMode(false);
              go(0);
              setData({ nombre: "", email: "", perfil: "", mensaje: "" });
            }}
            className="mt-6 text-sm text-white/40 hover:text-gold-2 transition-colors"
          >
            ← Empezar de nuevo
          </button>
        </motion.div>
      ) : (
        <motion.div
          key={current}
          initial={{ opacity: 0, x: dir * 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-1 flex-col"
        >
          <p className="eyebrow mb-3">{step.eyebrow}</p>
          <label htmlFor={step.key} className="font-display text-2xl md:text-[1.9rem] leading-snug text-ivory">
            {step.question}
          </label>
          <p className="mt-2.5 text-sm text-white/45 leading-relaxed">{step.hint}</p>

          <div className="mt-6">
            {step.type === "choice" ? (
              <div className="flex flex-col gap-2.5">
                {step.options!.map((opt) => {
                  const active = !otroMode && data.perfil === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => pickOption(opt)}
                      aria-pressed={active}
                      className={`rounded-xl border px-4 py-3.5 text-left text-[0.95rem] transition-all duration-200 ${
                        active
                          ? "bg-gold border-gold text-[#1a1206] font-medium shadow-[0_10px_26px_-12px_rgba(176,141,76,0.7)]"
                          : "border-[color:var(--navy-line)] text-white/70 hover:border-gold-2/50 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={pickOtro}
                  aria-pressed={otroMode}
                  className={`rounded-xl border px-4 py-3.5 text-left text-[0.95rem] transition-all duration-200 ${
                    otroMode
                      ? "border-gold-2/60 text-white bg-white/[0.04]"
                      : "border-[color:var(--navy-line)] text-white/70 hover:border-gold-2/50 hover:text-white"
                  }`}
                >
                  Otro…
                </button>

                {otroMode && (
                  <input
                    id="perfil"
                    ref={(el) => {
                      inputRef.current = el;
                    }}
                    type="text"
                    value={data.perfil}
                    onChange={(e) => setData((d) => ({ ...d, perfil: e.target.value }))}
                    onKeyDown={onKeyDown}
                    placeholder="Contame a qué te dedicás…"
                    className="mt-1 w-full rounded-xl bg-white/[0.04] border border-[color:var(--navy-line)] px-4 py-3.5 text-ivory placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[color:var(--gold)] focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(176,141,76,0.12)]"
                  />
                )}
              </div>
            ) : step.type === "textarea" ? (
              <textarea
                id={step.key}
                ref={(el) => {
                  inputRef.current = el;
                }}
                rows={4}
                value={value}
                onChange={(e) => setData((d) => ({ ...d, [step.key]: e.target.value }))}
                onKeyDown={onKeyDown}
                placeholder={step.placeholder}
                className="w-full rounded-xl bg-white/[0.04] border border-[color:var(--navy-line)] px-4 py-3.5 text-ivory placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[color:var(--gold)] focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(176,141,76,0.12)] resize-none"
              />
            ) : (
              <input
                id={step.key}
                ref={(el) => {
                  inputRef.current = el;
                }}
                type={step.type}
                value={value}
                onChange={(e) => setData((d) => ({ ...d, [step.key]: e.target.value }))}
                onKeyDown={onKeyDown}
                placeholder={step.placeholder}
                className="w-full rounded-xl bg-white/[0.04] border border-[color:var(--navy-line)] px-4 py-4 text-lg text-ivory placeholder:text-white/30 outline-none transition-all duration-300 focus:border-[color:var(--gold)] focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(176,141,76,0.12)]"
              />
            )}

            {touched && !valid && (
              <p className="mt-2 text-xs text-[#e0a4a4]">
                {step.type === "email"
                  ? "Ingresá un email válido para continuar."
                  : step.type === "choice"
                  ? "Elegí una opción o escribí la tuya para continuar."
                  : "Completá este campo para continuar."}
              </p>
            )}
          </div>

          {/* Navegación */}
          <div className="mt-auto pt-8 flex items-center justify-between gap-4">
            {current > 0 ? (
              <button
                type="button"
                onClick={() => go(current - 1)}
                className="inline-flex items-center gap-1.5 text-sm text-white/45 hover:text-white transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Atrás
              </button>
            ) : (
              <span className="text-xs text-white/30">Enter para continuar ↵</span>
            )}

            <button
              type="button"
              onClick={handleNext}
              className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300 ${
                valid
                  ? "bg-gold text-[#1a1206] hover:bg-gold-2 hover:-translate-y-0.5 shadow-[0_14px_34px_-14px_rgba(176,141,76,0.7)]"
                  : "bg-white/10 text-white/40 cursor-default"
              }`}
            >
              {isLast ? "Enviar" : "Continuar"}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
