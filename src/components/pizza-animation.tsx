"use client";

import { Pizza } from "./pizza";

export type Alphanumeric =
  | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M"
  | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
  | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

interface PizzaAnimationProps {
  letters: [Alphanumeric, Alphanumeric, Alphanumeric, Alphanumeric, Alphanumeric];
}

export function PizzaAnimation({ letters }: PizzaAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-12 text-white h-screen">
      <div className="relative w-64 h-64 md:w-96 md:h-96 animate-spin-extremely-slow">
        <Pizza />
      </div>
      <div className="flex gap-2 text-4xl font-fredoka uppercase">
        {letters.map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>
    </div>
  );
}
