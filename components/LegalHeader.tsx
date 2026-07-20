import Link from "next/link";

export default function LegalHeader() {
  return (
    <header className="border-b border-[color:var(--line-2)]">
      <div className="container-x flex items-center justify-between py-5">
        <Link href="/#top" className="font-display text-lg tracking-tight text-ink">
          Roberto&nbsp;Corvalán
        </Link>
        <Link
          href="/#top"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </header>
  );
}
