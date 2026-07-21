"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

type Role = { t: string; d: string };

export default function RolesCarousel({ roles }: { roles: Role[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 3400);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <>
      {/* Mobile: carrusel con fade */}
      <div className="md:hidden">
        <div className="relative min-h-[104px] flex items-start justify-center overflow-hidden">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center px-4"
          >
            <div className="mx-auto mb-4 h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--gold-2)] to-transparent" />
            <h3 className="text-lg font-medium text-white">{roles[i].t}</h3>
            <p className="mt-2 text-sm text-white/55 leading-relaxed max-w-[17rem] mx-auto">
              {roles[i].d}
            </p>
          </motion.div>
        </div>

        {/* Indicadores */}
        <div className="mt-6 flex justify-center gap-2">
          {roles.map((r, idx) => (
            <button
              key={r.t}
              onClick={() => setI(idx)}
              aria-label={`Ver ${r.t}`}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                idx === i ? "w-6 bg-gold-2" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: grid de 4 */}
      <div className="hidden md:grid grid-cols-4 gap-x-8 gap-y-9">
        {roles.map((r) => (
          <div key={r.t}>
            <div className="h-px w-full bg-gradient-to-r from-white/50 via-white/25 to-transparent mb-5" />
            <h3 className="text-lg font-medium text-white">{r.t}</h3>
            <p className="mt-2 text-sm text-white/55 leading-relaxed max-w-[15rem]">{r.d}</p>
          </div>
        ))}
      </div>
    </>
  );
}
