"use client";

import { Pizza } from "../pizza";

const orbits = [
  { r: 220, d: 15, s: 90 },
  { r: 340, d: 12, s: 110 },
  { r: 460, d: 9, s: 130 },
  { r: 580, d: 6, s: 100 },
];

import type { MessageLetters } from "@/types";

export function PizzaOrbitScene({
  letters: _,
}: {
  letters?: MessageLetters;
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden bg-background/20"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(75deg)",
        }}
      >
        {/* Central Pizza - No shadow as requested */}
        <div
          style={{
            transform: "rotateX(-75deg)",
            transformStyle: "preserve-3d",
          }}
          className="z-10"
        >
          <Pizza size={280} />
        </div>

        {/* Orbit Paths - More visible guides */}
        {orbits.map((o) => (
          <div
            key={o.r}
            className="absolute border border-white/40 rounded-full"
            style={{
              width: o.r * 2,
              height: o.r * 2,
              transform: "translateZ(-1px)",
            }}
          />
        ))}

        {/* Orbiting Pizzas */}
        {orbits.map((o, i) => (
          <OrbitingPizza
            key={i}
            radius={o.r}
            duration={o.d}
            delay={-i * 2}
            size={o.s}
          />
        ))}
      </div>
    </div>
  );
}

function OrbitingPizza({
  radius,
  duration,
  delay = 0,
  size = 100,
}: {
  radius: number;
  duration: number;
  delay?: number;
  size?: number;
}) {
  return (
    <div
      className="absolute"
      style={{
        width: radius * 2,
        height: radius * 2,
        transformStyle: "preserve-3d",
        animation: `spin ${duration}s linear infinite ${delay}s`,
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            animation: `spin ${duration}s linear infinite ${delay}s`,
            animationDirection: "reverse",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              transform: "rotateX(-75deg)", // Counter-tilt
            }}
          >
            <Pizza size={size} />
          </div>
        </div>
      </div>
    </div>
  );
}
