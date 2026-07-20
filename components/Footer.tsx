import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/5491136830740?text=" +
  encodeURIComponent("Hola Roberto, vi tu web y quiero coordinar una llamada.");

const nav = [
  { href: "/#sobre", label: "Sobre mí" },
  { href: "/#enfoque", label: "Enfoque" },
  { href: "/#coaches", label: "Comunidad" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#eventos", label: "Eventos" },
];

const servicios = [
  "Coaching Ejecutivo 1:1",
  "Talleres para Equipos",
  "Conferencias",
  "Consultoría Organizacional",
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

export default function Footer() {
  return (
    <footer className="bg-navy-2 text-ivory border-t border-[color:var(--navy-line)]">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          {/* Marca */}
          <div>
            <Link href="/#top" className="font-display text-2xl">
              Roberto Corvalán
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              Coach ejecutivo certificado ICF. Desarrollo personal, liderazgo y gestión
              organizacional para líderes, equipos y una comunidad de +1.500 coaches.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--navy-line)] text-white/60 transition-colors hover:border-[color:var(--gold)] hover:text-gold-2"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="eyebrow mb-5">Navegación</p>
            <ul className="space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/55 hover:text-gold-2 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <p className="eyebrow mb-5">Servicios</p>
            <ul className="space-y-3">
              {servicios.map((s) => (
                <li key={s}>
                  <Link href="/#servicios" className="text-sm text-white/55 hover:text-gold-2 transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="eyebrow mb-5">Contacto</p>
            <ul className="space-y-3 text-sm text-white/55">
              <li>
                <a href="mailto:hola@robertocorvalan.com" className="hover:text-gold-2 transition-colors">
                  hola@robertocorvalan.com
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold-2 transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="text-white/40">Argentina · Presencial y virtual</li>
            </ul>
            <Link
              href="/#contacto"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-medium text-[#1a1206] transition-colors hover:bg-gold-2"
            >
              Agendá tu sesión
            </Link>
          </div>
        </div>

        <div className="hairline my-10 opacity-40" />

        <div className="flex flex-col gap-4 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Roberto Corvalán. Todos los derechos reservados.</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacidad" className="hover:text-white/60 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white/60 transition-colors">
              Términos y Condiciones
            </Link>
            <span>Diseño y desarrollo por MYB Digitals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
