"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";

export default function StatNumber({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const match = value.match(/^([^\d]*)(\d+)([^\d]*)$/);
  const prefix = match?.[1] ?? "";
  const num = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";

  return (
    <span ref={ref} className={className}>
      {prefix}
      <AnimatedNumber value={inView ? num : 0} mass={0.6} stiffness={60} damping={14} />
      {suffix}
    </span>
  );
}
