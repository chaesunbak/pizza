"use client";

import { Pizza } from "../pizza";

import type { MessageLetters } from "@/types";

export function PizzaSnowScene({
  letters: _,
}: {
  letters: MessageLetters;
}) {
  const count = 40; // Dense enough for a snow effect

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#e5857e]">
      {Array.from({ length: count }).map((_, i) => {
        // Deterministic pseudo-random values based on index to avoid hydration mismatch
        const left = (i * 37) % 100;
        const delay = (i * 1.3) % 10;
        const duration = 7 + (i % 7);
        const size = 50 + (i % 5) * 30;
        const opacity = 0.5 + (i % 4) * 0.15;

        return (
          <div
            key={i}
            className="absolute top-0 animate-falling-snow"
            style={{
              left: `${left}%`,
              animationDelay: `-${delay}s`, // Negative delay to start mid-animation
              animationDuration: `${duration}s`,
              opacity: opacity,
            }}
          >
            <Pizza size={size} />
          </div>
        );
      })}
    </div>
  );
}
