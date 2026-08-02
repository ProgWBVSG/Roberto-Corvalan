"use client";

import { useEffect } from "react";
import Image from "next/image";

/**
 * Visor de imagen ampliada, reutilizable.
 * Se cierra con Escape, con la X o clickeando fuera. Bloquea el scroll
 * de fondo mientras está abierto.
 */
export default function Lightbox({
  src,
  alt,
  onClose,
  contain = true,
}: {
  src: string | null;
  alt: string;
  onClose: () => void;
  contain?: boolean;
}) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Imagen ampliada"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        className="relative h-[86vh] w-full max-w-[min(92vw,720px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={95}
          sizes="(max-width: 768px) 92vw, 720px"
          className={`rounded-xl ${contain ? "object-contain" : "object-cover"}`}
        />
      </div>
    </div>
  );
}
