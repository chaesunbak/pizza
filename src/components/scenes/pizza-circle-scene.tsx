"use client";

import { Pizza } from "../pizza";
import type { MessageLetters } from "@/types";

const RINGS = [
  { radius: 180, count: 6, duration: 25, reverse: false, size: 120 },
  { radius: 320, count: 12, duration: 35, reverse: true, size: 120 },
  { radius: 460, count: 18, duration: 45, reverse: false, size: 120 },
  { radius: 600, count: 24, duration: 55, reverse: true, size: 120 },
];

export function PizzaCircleScene({
  letters: _,
}: {
  letters?: MessageLetters;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden bg-background/20">
      <div className="relative">
        {/* Central Pizza */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="animate-spin-slow">
            <Pizza size={140} />
          </div>
        </div>

        {/* Orbiting Rings */}
        {RINGS.map((ring, ringIndex) => (
          <div
            key={ringIndex}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: ring.radius * 2,
              height: ring.radius * 2,
              animation: `${ring.reverse ? "spin-reverse" : "spin"} ${ring.duration}s linear infinite`,
            }}
          >
            {Array.from({ length: ring.count }).map((_, pizzaIndex) => {
              const angle = (360 / ring.count) * pizzaIndex;
              // Positioning logic: rotate to angle, move out by radius, rotate back to keep upright
              return (
                <div
                  key={pizzaIndex}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${ring.radius}px) rotate(-${angle}deg)`,
                  }}
                >
                  <div
                    style={{
                      animation: `${ring.reverse ? "spin" : "spin-reverse"} ${ring.duration}s linear infinite`,
                    }}
                  >
                    <div
                      style={{
                        animation: `${ring.reverse ? "spin-reverse" : "spin"} 8s linear infinite`,
                      }}
                    >
                      <Pizza size={ring.size} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
