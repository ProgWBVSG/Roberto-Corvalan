import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robertocorvalan.com"),
  title: {
    default: "Roberto Corvalán · Coach Ejecutivo y de Liderazgo",
    template: "%s | Roberto Corvalán",
  },
  description:
    "Coach ejecutivo certificado ICF. Coaching 1:1, talleres para equipos, conferencias y consultoría organizacional. Acompaño a líderes y a una comunidad de +1500 coaches.",
  keywords: [
    "coach ejecutivo",
    "coaching de liderazgo",
    "coaching ejecutivo 1:1",
    "desarrollo personal",
    "gestión organizacional",
    "talleres de liderazgo para equipos",
    "consultoría organizacional",
    "Roberto Corvalán",
    "formación de coaches",
    "coach certificado ICF",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Roberto Corvalán · Coach Ejecutivo y de Liderazgo",
    description:
      "Coaching ejecutivo, talleres, conferencias y consultoría organizacional. +20 años desarrollando líderes y una comunidad de +1500 coaches.",
    url: "/",
    siteName: "Roberto Corvalán",
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
    title: "Roberto Corvalán · Coach Ejecutivo y de Liderazgo",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://robertocorvalan.com/#person",
      name: "Roberto Corvalán",
      jobTitle: "Coach Ejecutivo y de Liderazgo",
      description:
        "Coach profesional certificado ICF, especializado en desarrollo personal, liderazgo y gestión organizacional.",
      url: "https://robertocorvalan.com",
      image: "https://robertocorvalan.com/roberto-hero.png",
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
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://robertocorvalan.com/#service",
      name: "Roberto Corvalán · Coaching Ejecutivo",
      url: "https://robertocorvalan.com",
      founder: { "@id": "https://robertocorvalan.com/#person" },
      areaServed: "AR",
      availableLanguage: "es",
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Coaching Ejecutivo 1:1" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Talleres para Equipos" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conferencias" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Consultoría Organizacional" } },
      ],
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
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
