"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** Entrada suave no scroll: sobe 64px, perde o blur e ganha opacidade. Usa IntersectionObserver. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform,filter] duration-1000 ease-fluid motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-none motion-reduce:transition-none ${
        visivel ? "translate-y-0 opacity-100 blur-0" : "translate-y-16 opacity-0 blur-md"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
