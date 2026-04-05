"use client";

import { Pizza } from "../pizza";

export function PizzaCheckerScene() {
  const rows = 5;
  const cols = 5;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden bg-background/50"
      style={{ perspective: "1200px" }}
    >
      <div className={`grid grid-cols-5 gap-4 md:gap-8 lg:gap-12`}>
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const isOdd = (row + col) % 2 !== 0;

          return (
            <div
              key={i}
              className="animate-flip flex items-center justify-center p-2"
              style={{
                animationDelay: isOdd ? "2s" : "0s",
              }}
            >
              <Pizza size={140} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
