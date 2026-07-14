"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  words,
  className = "",
  typeSpeed = 80,
  deleteSpeed = 40,
  pause = 1600,
}: {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((v) => (v + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () =>
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        ),
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return (
    <span className={className} aria-label={words.join(", ")}>
      {text}
      <span
        aria-hidden="true"
        className="tw-caret ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.06em] bg-gold-2 align-baseline"
      />
    </span>
  );
}
