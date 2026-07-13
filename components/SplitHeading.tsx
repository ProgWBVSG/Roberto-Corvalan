"use client";

import { motion } from "motion/react";

const container = {
  hidden: {},
  visible: (delayChildren: number) => ({
    transition: { staggerChildren: 0.022, delayChildren },
  }),
};

const word = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function SplitHeading({
  lines,
  className = "",
  delay = 0,
}: {
  lines: { text: string; className?: string }[];
  className?: string;
  delay?: number;
}) {
  return (
    <motion.h1
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      custom={delay}
      variants={container}
    >
      {lines.map((line, li) => (
        <span key={li} className={`block overflow-hidden ${line.className ?? ""}`}>
          {line.text.split(" ").map((w, wi) => (
            <span key={wi} className="inline-block overflow-hidden mr-[0.28em] align-top">
              <motion.span className="inline-block" variants={word}>
                {w}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
