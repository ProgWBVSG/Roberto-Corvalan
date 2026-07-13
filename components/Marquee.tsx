"use client";

export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];

  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-10 group-hover:[animation-play-state:paused]">
        {loop.map((name, i) => (
          <span
            key={i}
            className="flex items-center gap-3 font-display text-base md:text-lg uppercase tracking-[0.14em] text-ink-2/70 whitespace-nowrap"
          >
            {name}
            <span className="h-1 w-1 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
