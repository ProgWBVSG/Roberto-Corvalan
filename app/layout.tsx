import type { Metadata } from "next";
import { Playfair_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robertocorvalan.com"),
  title: {
    default: "Coach Ejecutivo y de Liderazgo en Argentina | Roberto C. Corvalán",
    template: "%s | Roberto C. Corvalán",
  },
  description:
    "Coach ejecutivo acreditado (CPA por la CIC, formación ICF) en Argentina. Coaching 1:1, talleres para equipos, conferencias y consultoría organizacional. +20 años y una comunidad de +1.500 coaches. Presencial y virtual.",
  keywords: [
    "coach ejecutivo",
    "coach ejecutivo Argentina",
    "coaching de liderazgo",
    "coaching ejecutivo 1:1",
    "coach empresarial",
    "desarrollo personal",
    "gestión organizacional",
    "talleres de liderazgo para equipos",
    "consultoría organizacional",
    "Roberto Corvalán",
    "Roberto C. Corvalán coach",
    "formación de coaches",
    "coach certificado ICF",
    "coach acreditado CIC",
    "mentoría para coaches",
    "conferencista de liderazgo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Coach Ejecutivo y de Liderazgo en Argentina | Roberto C. Corvalán",
    description:
      "Coaching ejecutivo, talleres, conferencias y consultoría organizacional. +20 años desarrollando líderes y una comunidad de +1.500 coaches.",
    url: "/",
    siteName: "Roberto C. Corvalán",
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: "/roberto-hero.png",
        width: 1370,
        height: 760,
        alt: "Roberto Corvalán, coach ejecutivo y de liderazgo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coach Ejecutivo y de Liderazgo en Argentina | Roberto C. Corvalán",
    description:
      "Coaching ejecutivo, talleres, conferencias y consultoría organizacional. +20 años desarrollando líderes.",
    images: ["/roberto-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "Zu4b0eQwRylhsvji5lpnAnGDD99PH5LrxNSm0bAdfvs",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://robertocorvalan.com/#person",
      name: "Roberto C. Corvalán",
      alternateName: "Roberto Carlos Corvalán Donoso",
      jobTitle: "Coach Ejecutivo y de Liderazgo",
      description:
        "Coach profesional acreditado (CPA por la CIC, formación ICF), especializado en desarrollo personal, liderazgo y gestión organizacional.",
      url: "https://robertocorvalan.com",
      image: "https://robertocorvalan.com/roberto-hero.png",
      sameAs: [
        "https://www.instagram.com/roberto.corvalan.coach/",
        "https://www.linkedin.com/in/roberto-c-corvalan-coach-profesional-649749a4/",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "AR",
      },
      knowsAbout: [
        "Coaching ejecutivo",
        "Liderazgo",
        "Desarrollo personal",
        "Gestión organizacional",
        "Neurociencias aplicadas",
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Coach Profesional ACTP",
          recognizedBy: { "@type": "Organization", name: "International Coaching Federation (ICF)" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Coach Ejecutivo CCE",
          recognizedBy: { "@type": "Organization", name: "International Coaching Federation (ICF)" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "CPA — Coach Profesional Acreditado",
          identifier: "AR-29.05.510",
          validFrom: "2026-05-29",
          recognizedBy: {
            "@type": "Organization",
            name: "Confederación Interamericana de Coaching (CIC)",
          },
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://robertocorvalan.com/#service",
      name: "Roberto C. Corvalán · Coaching Ejecutivo",
      description:
        "Coaching ejecutivo, talleres para equipos, conferencias y consultoría organizacional, presencial y virtual.",
      url: "https://robertocorvalan.com",
      image: "https://robertocorvalan.com/roberto-hero.png",
      founder: { "@id": "https://robertocorvalan.com/#person" },
      provider: { "@id": "https://robertocorvalan.com/#person" },
      telephone: "+5491136830740",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "AR",
      },
      areaServed: { "@type": "Country", name: "Argentina" },
      availableLanguage: "es",
      sameAs: [
        "https://www.instagram.com/roberto.corvalan.coach/",
        "https://www.linkedin.com/in/roberto-c-corvalan-coach-profesional-649749a4/",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de coaching y consultoría",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Coaching Ejecutivo 1:1",
              description:
                "Sesiones individuales y confidenciales para clarificar objetivos, fortalecer competencias y tomar mejores decisiones.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Talleres para Equipos",
              description:
                "Talleres in-company a medida para desarrollar liderazgo, mejorar la productividad y consolidar equipos de alto rendimiento.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Conferencias",
              description:
                "Charlas sobre liderazgo, cambio y transformación personal y organizacional.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Consultoría Organizacional",
              description:
                "Diagnóstico y acompañamiento para alinear cultura, propósito y estrategia.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://robertocorvalan.com/#website",
      url: "https://robertocorvalan.com",
      name: "Roberto C. Corvalán",
      inLanguage: "es-AR",
      publisher: { "@id": "https://robertocorvalan.com/#person" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://robertocorvalan.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Las sesiones son presenciales o virtuales?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ambas modalidades. Elegimos la que mejor se adapte a vos o a tu equipo.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto dura un proceso de coaching?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Varía según el objetivo. Lo definimos juntos en una primera llamada, sin cargo.",
          },
        },
        {
          "@type": "Question",
          name: "¿Trabajás solo con ejecutivos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Acompaño a ejecutivos, equipos completos y también formo y mentoreo a coaches.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo empiezo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Reservás una llamada de 30 minutos sin cargo y desde ahí trazamos el camino juntos.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${hanken.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
