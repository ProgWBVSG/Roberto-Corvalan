"use client";

import { useRef, useState } from "react";
import type { ImageField } from "@/lib/content-schema";

function resolveSrc(field: ImageField): string {
  return field.mediaId ? `/api/media/${field.mediaId}` : field.fallbackSrc;
}

export function ImageFieldEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: ImageField;
  onChange: (v: ImageField) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error al subir la imagen");
      onChange({ ...value, mediaId: json.id });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-white/50">{label}</span>
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[color:var(--navy-line)] bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveSrc(value)}
            alt={value.alt || label}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-[color:var(--navy-line)] px-3.5 py-2 text-xs font-medium text-white/70 transition-colors hover:text-white hover:border-white/30 disabled:opacity-50"
          >
            {uploading ? "Subiendo…" : "Cambiar imagen"}
          </button>
          {error && <p className="mt-1.5 text-xs text-[#e0a4a4]">{error}</p>}
        </div>
      </div>
      <input
        type="text"
        value={value.alt}
        onChange={(e) => onChange({ ...value, alt: e.target.value })}
        placeholder="Texto alternativo (SEO / accesibilidad)"
        className="mt-2 w-full rounded-lg bg-white/[0.04] border border-[color:var(--navy-line)] px-3.5 py-2 text-xs text-ivory outline-none transition-colors focus:border-[color:var(--gold)]"
      />
    </div>
  );
}
