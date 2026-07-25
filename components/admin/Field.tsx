"use client";

export function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/50">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg bg-white/[0.04] border border-[color:var(--navy-line)] px-3.5 py-2.5 text-sm text-ivory outline-none transition-colors focus:border-[color:var(--gold)]"
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/50">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full resize-y rounded-lg bg-white/[0.04] border border-[color:var(--navy-line)] px-3.5 py-2.5 text-sm text-ivory outline-none transition-colors focus:border-[color:var(--gold)]"
      />
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/50">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-white/[0.04] border border-[color:var(--navy-line)] px-3.5 py-2.5 text-sm text-ivory outline-none transition-colors focus:border-[color:var(--gold)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-navy">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
