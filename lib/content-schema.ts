import { z } from "zod";

/**
 * Esquema completo del contenido editable del sitio.
 * Cada imagen usa { mediaId, fallbackSrc, alt }: si mediaId está seteado,
 * se sirve desde /api/media/[id] (subida desde el panel); si no, se usa
 * fallbackSrc (el asset estático original en /public). Esto permite que
 * el día 1 (sin ninguna edición) el sitio se vea IGUAL a como está hoy.
 */

const idSchema = z.string().min(1);

export const imageFieldSchema = z.object({
  mediaId: z.string().nullable().default(null),
  fallbackSrc: z.string().default(""),
  alt: z.string().default(""),
});
export type ImageField = z.infer<typeof imageFieldSchema>;

function img(fallbackSrc: string, alt: string): ImageField {
  return { mediaId: null, fallbackSrc, alt };
}

/** Resuelve la URL real de una imagen: subida (DB) o el asset estático original. */
export function imgSrc(field: ImageField): string {
  return field.mediaId ? `/api/media/${field.mediaId}` : field.fallbackSrc;
}

/**
 * Arma un enlace mailto con el asunto y el cuerpo ya redactados, para que al
 * tocarlo se abra el cliente de correo listo para enviar (igual que el
 * enlace de WhatsApp).
 */
export function mailtoLink(
  email: string,
  subject?: string,
  body?: string
): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString().replace(/\+/g, "%20");
  return `mailto:${email}${qs ? `?${qs}` : ""}`;
}

const iconKeySchema = z.enum(["target", "layers", "chart", "heart", "star", "shield"]);
export type IconKey = z.infer<typeof iconKeySchema>;

export const contentSchema = z.object({
  global: z.object({
    whatsappNumber: z.string().min(6).max(20),
    whatsappDefaultMessage: z.string().min(1).max(300),
    email: z.string().email(),
    emailDefaultSubject: z.string().min(1).max(150),
    emailDefaultBody: z.string().min(1).max(500),
  }),

  hero: z.object({
    titleLine1: z.string().min(1).max(80),
    titleLine2: z.string().min(1).max(80),
    introText: z.string().min(1).max(400),
    statNumber: z.string().min(1).max(20),
    statWords: z.array(z.string().min(1).max(60)).min(1).max(8),
    outroText: z.string().min(1).max(300),
    ctaText: z.string().min(1).max(80),
    background: imageFieldSchema,
    roles: z
      .array(
        z.object({
          id: idSchema,
          titulo: z.string().min(1).max(60),
          descripcion: z.string().min(1).max(200),
        })
      )
      .min(1)
      .max(8),
  }),

  empresas: z.object({
    titulo: z.string().min(1).max(80),
    logos: z
      .array(
        z.object({
          id: idSchema,
          nombre: z.string().min(1).max(80),
          logo: imageFieldSchema,
        })
      )
      .max(30),
  }),

  servicios: z.object({
    titulo: z.string().min(1).max(120),
    descripcion: z.string().min(1).max(400),
    ctaText: z.string().min(1).max(80),
    items: z
      .array(
        z.object({
          id: idSchema,
          numero: z.string().min(1).max(6),
          titulo: z.string().min(1).max(80),
          descripcion: z.string().min(1).max(400),
          tag: z.string().min(1).max(60),
          imagen: imageFieldSchema,
        })
      )
      .min(1)
      .max(10),
  }),

  ctaBand: z.object({
    titulo: z.string().min(1).max(120),
    descripcion: z.string().min(1).max(300),
    ctaText: z.string().min(1).max(80),
    imagen: imageFieldSchema,
    testimonioTexto: z.string().min(1).max(300),
    testimonioAutor: z.string().min(1).max(100),
  }),

  enfoque: z.object({
    titulo: z.string().min(1).max(120),
    descripcion: z.string().min(1).max(400),
    ctaText: z.string().min(1).max(80),
    imagenFondo: imageFieldSchema,
    items: z
      .array(
        z.object({
          id: idSchema,
          titulo: z.string().min(1).max(60),
          descripcion: z.string().min(1).max(200),
          icono: iconKeySchema,
        })
      )
      .min(1)
      .max(8),
  }),

  sobreMi: z.object({
    titulo: z.string().min(1).max(160),
    parrafo1: z.string().min(1).max(600),
    parrafo2: z.string().min(1).max(600),
    foto: imageFieldSchema,
    ctaText: z.string().min(1).max(80),
    certificaciones: z
      .array(
        z.object({
          id: idSchema,
          titulo: z.string().min(1).max(80),
          descripcion: z.string().min(1).max(200),
        })
      )
      .max(10),
    otrasAcreditaciones: z
      .array(
        z.object({
          id: idSchema,
          texto: z.string().min(1).max(400),
        })
      )
      .max(10),
    certificadoCIC: z.object({
      badgeText: z.string().min(1).max(60),
      titulo: z.string().min(1).max(80),
      subtitulo: z.string().min(1).max(80),
      descripcion: z.string().min(1).max(400),
      // Carrusel de credenciales (certificado CIC, embajador, etc.)
      credenciales: z
        .array(
          z.object({
            id: idSchema,
            imagen: imageFieldSchema,
          })
        )
        .min(1)
        .max(8),
      datos: z
        .array(
          z.object({
            id: idSchema,
            etiqueta: z.string().min(1).max(40),
            valor: z.string().min(1).max(80),
          })
        )
        .max(8),
      asociacionesTitulo: z.string().min(1).max(80),
      asociaciones: z
        .array(
          z.object({
            id: idSchema,
            nombre: z.string().min(1).max(80),
            logo: imageFieldSchema,
          })
        )
        .max(20),
    }),
  }),

  comunidad: z.object({
    headingPrefix: z.string().min(1).max(120),
    statNumber: z.string().min(1).max(20),
    statWords: z.array(z.string().min(1).max(60)).min(1).max(8),
    descripcion: z.string().min(1).max(400),
    features: z
      .array(
        z.object({
          id: idSchema,
          texto: z.string().min(1).max(120),
        })
      )
      .max(8),
    ctaText: z.string().min(1).max(80),
    foto: imageFieldSchema,
  }),

  eventos: z.object({
    titulo: z.string().min(1).max(120),
    descripcion: z.string().min(1).max(400),
    referentesTitulo: z.string().min(1).max(80),
    referentes: z
      .array(
        z.object({
          id: idSchema,
          nombre: z.string().min(1).max(80),
        })
      )
      .max(20),
    ctaText: z.string().min(1).max(80),
    fotos: z
      .array(
        z.object({
          id: idSchema,
          imagen: imageFieldSchema,
          ratio: z.enum(["wide", "square"]),
        })
      )
      .min(1)
      .max(6),
  }),

  banner: z.object({
    tituloNormal: z.string().min(1).max(120),
    tituloAcento: z.string().min(1).max(120),
    statNumber: z.string().min(1).max(20),
    statWords: z.array(z.string().min(1).max(60)).min(1).max(8),
    ctaText: z.string().min(1).max(80),
    imagen: imageFieldSchema,
  }),

  testimonios: z.object({
    titulo: z.string().min(1).max(120),
    descripcion: z.string().min(1).max(300),
    items: z
      .array(
        z.object({
          id: idSchema,
          cita: z.string().min(1).max(400),
          autor: z.string().min(1).max(80),
          rol: z.string().min(1).max(80),
        })
      )
      .max(12),
  }),

  contacto: z.object({
    titulo: z.string().min(1).max(120),
    descripcion: z.string().min(1).max(300),
  }),

  footer: z.object({
    bio: z.string().min(1).max(400),
    cicBadgeLinea1: z.string().min(1).max(40),
    cicBadgeLinea2: z.string().min(1).max(40),
    cicImagen: imageFieldSchema,
    ubicacion: z.string().min(1).max(80),
  }),
});

export type SiteContent = z.infer<typeof contentSchema>;

export const iconLibrary: Record<IconKey, string> = {
  target: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5",
  chart: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 8a4 4 0 100 8 4 4 0 000-8zM12 11.6a.4.4 0 100 .8.4.4 0 000-.8z",
  heart: "M8 12a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 2.7-5 6-5s6 2 6 5M16 6a3 3 0 011 5.8M22 20c0-2.2-1.2-3.8-3-4.6",
  star: "M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z",
  shield: "M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z",
};

export const iconOptions: { key: IconKey; label: string }[] = [
  { key: "target", label: "Diana / diagnóstico" },
  { key: "layers", label: "Capas / proceso" },
  { key: "chart", label: "Gráfico / resultados" },
  { key: "heart", label: "Corazón / acompañamiento" },
  { key: "star", label: "Estrella" },
  { key: "shield", label: "Escudo" },
];

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const defaultContent: SiteContent = {
  global: {
    whatsappNumber: "5491136830740",
    whatsappDefaultMessage: "Hola Roberto, vi tu web y quiero coordinar una llamada.",
    email: "info@robertocorvalancoach.com.ar",
    emailDefaultSubject: "Consulta desde la web",
    emailDefaultBody:
      "Hola Roberto,\n\nVi tu web y me gustaría coordinar una conversación.\n\nMi nombre es: \nMe dedico a: \nQuisiera que me ayudes con: \n\n¡Gracias!",
  },

  hero: {
    titleLine1: "Grandes líderes no nacen.",
    titleLine2: "Se acompañan.",
    introText:
      "Soy Roberto Corvalán. Hace más de 20 años acompaño a ejecutivos y a una comunidad de",
    statNumber: "+1.500",
    statWords: ["coaches", "emprendedores", "profesionales independientes", "empresarios"],
    outroText: "a liderar con claridad, propósito y resultados que perduran.",
    ctaText: "Empecemos a trabajar juntos",
    background: img("/roberto-hero.png", "Roberto Corvalán, coach ejecutivo y de liderazgo"),
    roles: [
      { id: uid(), titulo: "Coach", descripcion: "Sesiones 1:1 de coaching ejecutivo que impulsan decisiones y resultados." },
      { id: uid(), titulo: "Mentor", descripcion: "Mentorías en liderazgo, hábitos y habilidades blandas, con método probado." },
      { id: uid(), titulo: "Consultor", descripcion: "Consultoría organizacional para alinear cultura, equipos y productividad." },
      { id: uid(), titulo: "Conferencista", descripcion: "Conferencias y talleres sobre liderazgo, cambio y alto rendimiento." },
    ],
  },

  empresas: {
    titulo: "Empresas que confían en mí",
    logos: [
      { id: uid(), nombre: "Abart", logo: img("/logos/abart.jpeg", "Abart") },
      { id: uid(), nombre: "Federación Patronal Seguros", logo: img("/logos/federacion-patronal.jpeg", "Federación Patronal Seguros") },
      { id: uid(), nombre: "Forza Seguros", logo: img("/logos/forza-seguros.jpeg", "Forza Seguros") },
      { id: uid(), nombre: "Mary Kay", logo: img("/logos/mary-kay.jpeg", "Mary Kay") },
      { id: uid(), nombre: "Monsalvo Propiedades", logo: img("/logos/monsalvo-propiedades.jpeg", "Monsalvo Propiedades") },
      { id: uid(), nombre: "PARH APS Seguros", logo: img("/logos/parh-aps.jpeg", "PARH APS Seguros") },
      { id: uid(), nombre: "SETUP", logo: img("/logos/setup.jpeg", "SETUP") },
      { id: uid(), nombre: "EmprendePyme", logo: img("/logos/emprendepyme.jpeg", "EmprendePyme") },
      { id: uid(), nombre: "Networking Presencial", logo: img("/logos/networking-presencial.jpeg", "Networking Presencial") },
      { id: uid(), nombre: "ADN Inmobiliario", logo: img("/logos/adn-inmobiliario.jpeg", "ADN Inmobiliario") },
      { id: uid(), nombre: "Coaching para Equipos de Salud", logo: img("/logos/coaching-equipos-salud.jpeg", "Coaching para Equipos de Salud") },
    ],
  },

  servicios: {
    titulo: "Un acompañamiento para cada objetivo.",
    descripcion:
      "Elegimos juntos el camino según el momento que estés atravesando vos o tu equipo, presencial o virtual.",
    ctaText: "Explorá nuestros programas",
    items: [
      {
        id: uid(),
        numero: "01",
        titulo: "Coaching Ejecutivo 1:1",
        descripcion:
          "Sesiones individuales y confidenciales para clarificar objetivos, fortalecer competencias y tomar mejores decisiones, con un plan de acción concreto.",
        tag: "Individual · Confidencial",
        imagen: img("/servicios/coaching.png", "Coaching Ejecutivo 1:1"),
      },
      {
        id: uid(),
        numero: "02",
        titulo: "Talleres para Equipos",
        descripcion:
          "Talleres in-company a medida para desarrollar liderazgo, mejorar la productividad y consolidar equipos de alto rendimiento.",
        tag: "In-company · A medida",
        imagen: img("/servicios/talleres.png", "Talleres para Equipos"),
      },
      {
        id: uid(),
        numero: "03",
        titulo: "Conferencias",
        descripcion:
          "Charlas sobre liderazgo, cambio y transformación personal y organizacional, con herramientas aplicables desde el primer día.",
        tag: "Presencial · Virtual",
        imagen: img("/servicios/conferencias.png", "Conferencias"),
      },
      {
        id: uid(),
        numero: "04",
        titulo: "Consultoría Organizacional",
        descripcion:
          "Diagnóstico y acompañamiento para alinear cultura, propósito y estrategia, elevando el bienestar y el desempeño del equipo.",
        tag: "Cultura · Estrategia",
        imagen: img("/servicios/consultoria.png", "Consultoría Organizacional"),
      },
    ],
  },

  ctaBand: {
    titulo: "¿Tu liderazgo llegó a un techo?",
    descripcion:
      "Una consulta estratégica de 30 minutos, sin cargo, para identificar dónde tu liderazgo necesita método, no más esfuerzo.",
    ctaText: "Solicitá una consulta estratégica",
    imagen: img("/servicios/conferencias.png", "Roberto Corvalán en conferencia"),
    testimonioTexto:
      "Salí de cada sesión con más claridad y decisiones concretas. Un antes y un después en mi liderazgo.",
    testimonioAutor: "Directora General, empresa de retail",
  },

  enfoque: {
    titulo: "¿Qué hace que mi coaching funcione?",
    descripcion:
      "Una metodología estructurada y probada, no una fórmula genérica, para desarrollar tu liderazgo y el de tu equipo con resultados medibles.",
    ctaText: "Quiero mi diagnóstico gratuito",
    imagenFondo: img("/servicios/consultoria.png", ""),
    items: [
      { id: uid(), titulo: "Diagnóstico real", descripcion: "Partimos de tu punto de partida concreto, nunca de fórmulas genéricas.", icono: "target" },
      { id: uid(), titulo: "Proceso estructurado", descripcion: "Sesiones, talleres y conferencias con método y objetivos claros.", icono: "layers" },
      { id: uid(), titulo: "Foco en resultados", descripcion: "Mejora medible en liderazgo, productividad y bienestar del equipo.", icono: "chart" },
      { id: uid(), titulo: "Acompañamiento humano", descripcion: "Un proceso confidencial, cercano y sostenido en el tiempo.", icono: "heart" },
    ],
  },

  sobreMi: {
    titulo: "Un acompañamiento profesional, humano y con respaldo real.",
    parrafo1:
      "Soy Roberto Corvalán, coach profesional certificado con sólida formación y experiencia en desarrollo personal, liderazgo y gestión organizacional. Soy CPA (Coach Profesional Acreditado) por la CIC. Mi propósito es acompañar a organizaciones y personas a desplegar su potencial y su liderazgo, promoviendo el logro de metas y objetivos estratégicos.",
    parrafo2:
      "A través de un proceso estructurado (sesiones, talleres y conferencias) fortalezco competencias, mejoro los indicadores de productividad y bienestar, y consolido equipos de alto rendimiento. El resultado es una transformación sostenible que impulsa el crecimiento individual y organizacional, y afianza una cultura de bienestar y excelencia.",
    foto: img("/fotos/retrato-profesional.webp", "Roberto Corvalán, coach ejecutivo"),
    ctaText: "Coordinar una reunión",
    certificaciones: [
      { id: uid(), titulo: "Coach Profesional", descripcion: "International Coaching Federation (ICF), programa ACTP (Accredited Coach Training Program)." },
      { id: uid(), titulo: "Coach Ejecutivo", descripcion: "Programa CCE (Continuing Coach Education), conforme a las normas de la ICF." },
      { id: uid(), titulo: "Coach Inmobiliario", descripcion: "Certificado por Ricardo Melo." },
      { id: uid(), titulo: "Consultor de Empresas", descripcion: "Acreditado por Grupo Set Consulting." },
    ],
    otrasAcreditaciones: [
      { id: uid(), texto: "Mentor certificado en el programa de Liderazgo y Habilidades Blandas de John Maxwell." },
      { id: uid(), texto: "Mentor en Liderazgo y los hábitos de la gente altamente efectiva, con Grupo Set y Jonathan Loidi." },
      { id: uid(), texto: "Mentor en Neurociencias Integradas para potenciar procesos de cambio y transformación personal y organizacional, certificado por Marcelo Piredda y Verónica Laura Díaz." },
    ],
    certificadoCIC: {
      badgeText: "Acreditación vigente",
      titulo: "CPA · Coach Profesional",
      subtitulo: "Acreditado",
      descripcion:
        "Otorgado por la Confederación Interamericana de Coaching (CIC), tras cumplir con las estipulaciones nacionales e internacionales del comité de acreditación.",
      credenciales: [
        {
          id: uid(),
          imagen: img(
            "/fotos/certificado-cic.jpeg",
            "Certificado de acreditación como Coach Profesional otorgado a Roberto Carlos Corvalán Donoso por la Confederación Interamericana de Coaching (CIC)"
          ),
        },
        {
          id: uid(),
          imagen: img(
            "/fotos/embajador-red-global-mentores.jpeg",
            "Roberto C. Corvalán, Embajador de la Red Global de Mentores"
          ),
        },
      ],
      datos: [
        { id: uid(), etiqueta: "Credencial", valor: "Coach Profesional Acreditado" },
        { id: uid(), etiqueta: "Código", valor: "AR · 29.05.510" },
        { id: uid(), etiqueta: "Vigencia", valor: "2026 — 2028" },
        { id: uid(), etiqueta: "Sede", valor: "Asunción, Paraguay" },
      ],
      asociacionesTitulo: "Redes y asociaciones",
      asociaciones: [
        { id: uid(), nombre: "CIC — Confederación Interamericana de Coaching", logo: img("/fotos/cic-acreditacion.jpeg", "CIC — Confederación Interamericana de Coaching") },
        { id: uid(), nombre: "ARGENNOVA", logo: img("/logos/argennova.png", "ARGENNOVA") },
        { id: uid(), nombre: "Red Global de Mentores", logo: img("/logos/red-global-mentores.jpeg", "Red Global de Mentores") },
      ],
    },
  },

  comunidad: {
    headingPrefix: "Una comunidad que crece unida:",
    statNumber: "+1.500",
    statWords: ["coaches", "ejecutivos", "profesionales", "emprendedores", "profesionales independientes", "empresas"],
    descripcion:
      "Si sos coach, este es tu lugar. Formación continua, mentoría, supervisión de casos y una red de profesionales que comparten camino, herramientas y oportunidades. Elevamos la profesión trabajando juntos.",
    features: [
      { id: uid(), texto: "Mentoría y supervisión profesional" },
      { id: uid(), texto: "Formación y actualización continua" },
      { id: uid(), texto: "Networking con +1500 colegas" },
      { id: uid(), texto: "Herramientas y metodología propia" },
    ],
    ctaText: "Unite a la comunidad",
    foto: img("/fotos/comunidad.jpeg", "Roberto Corvalán en la entrega de certificaciones junto a coaches de su comunidad"),
  },

  eventos: {
    titulo: "Encuentros que reúnen a grandes referentes.",
    descripcion:
      "Organizo eventos y formaciones donde referentes del liderazgo y el coaching comparten escenario con una comunidad de +1500 coaches.",
    referentesTitulo: "Referentes invitados",
    referentes: [
      { id: uid(), nombre: "Grupo Set" },
      { id: uid(), nombre: "ARGENNOVA" },
      { id: uid(), nombre: "Networking Presencial" },
      { id: uid(), nombre: "CIC" },
    ],
    ctaText: "Quiero enterarme del próximo evento",
    fotos: [
      { id: uid(), imagen: img("/fotos/evento-taller.jpeg", "Roberto Corvalán dictando un taller de modelo de negocio y liderazgo"), ratio: "wide" },
      { id: uid(), imagen: img("/fotos/evento-conferencia.jpeg", "Roberto Corvalán dando una conferencia sobre liderazgo"), ratio: "square" },
      { id: uid(), imagen: img("/fotos/evento-loidi.jpeg", "Roberto Corvalán junto a Jonatan Loidi en un evento de Grupo Set"), ratio: "square" },
    ],
  },

  banner: {
    tituloNormal: "Más de dos décadas de trabajo,",
    tituloAcento: "respaldadas por números.",
    statNumber: "+1.500",
    statWords: ["ejecutivos", "profesionales", "emprendedores", "profesionales independientes", "empresas"],
    ctaText: "Reservá tu llamada · cupos limitados",
    imagen: img("/roberto-cutout.png", "Roberto Corvalán"),
  },

  testimonios: {
    titulo: "Historias reales de líderes y coaches que acompañé.",
    descripcion: "Cada una es un camino único, guiado por claridad, método y el coraje de crecer.",
    items: [
      {
        id: uid(),
        cita: "Roberto tiene una capacidad única para ver lo que uno no ve. Salí de cada sesión con más claridad y decisiones concretas.",
        autor: "Directora General",
        rol: "Empresa de retail",
      },
      {
        id: uid(),
        cita: "Su acompañamiento transformó la forma en que lidero mi equipo. Hoy delego mejor y el clima cambió por completo.",
        autor: "Gerente de Operaciones",
        rol: "Industria",
      },
      {
        id: uid(),
        cita: "Como coach, su mentoría me dio herramientas y una comunidad. Es el referente que todo profesional del coaching quiere tener.",
        autor: "Coach certificada",
        rol: "Comunidad +1500",
      },
    ],
  },

  contacto: {
    titulo: "Demos el primer paso hacia tu próximo nivel.",
    descripcion:
      "Contame en qué momento estás y qué querés transformar. Coordinamos una primera conversación, sin compromiso.",
  },

  footer: {
    bio: "Coach ejecutivo certificado ICF. Desarrollo personal, liderazgo y gestión organizacional para líderes, equipos y una comunidad de +1.500 coaches.",
    cicBadgeLinea1: "Coach Profesional",
    cicBadgeLinea2: "Acreditado · CIC",
    cicImagen: img("/fotos/cic-acreditacion.jpeg", "Coach Profesional Acreditado — Confederación Interamericana de Coaching (CIC)"),
    ubicacion: "Argentina · Presencial y virtual",
  },
};
