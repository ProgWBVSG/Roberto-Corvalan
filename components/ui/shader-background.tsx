"use client";

import { useEffect, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

export default function ShaderBackground({
  className = "",
  overlayClassName = "bg-[#080b11]/45",
  speed = 0.24,
}: {
  className?: string;
  overlayClassName?: string;
  speed?: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`} aria-hidden="true">
      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={["#070c15", "#0c1017", "#1c3a6b", "#b08d4c"]}
        speed={speed}
        distortion={0.85}
        swirl={0.18}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
