"use client";

import { Pizza } from "../pizza";
import type { MessageLetters } from "@/types";

export function PizzaSpiralScene({
  letters: _,
}: {
  letters?: MessageLetters;
}) {
  // Archimedean spiral parameters: r = a + b * theta
  // We'll use theta (index) to determine radius and angle.
  // Using a power-law for the radius to control density
  // Area A = PI * r^2. If r = c * i^p, then A = PI * c^2 * i^(2p).
  // Density D = dN/dA = 1 / (dA/di) = 1 / (PI * c^2 * 2p * i^(2p-1)) = i^(1-2p) / (2p * PI * c^2).
  // For density to increase with i (dense outside), 1-2p > 0 => p < 0.5.
  // Balanced spiral: less extreme density, fewer pizzas
  const PIZZA_COUNT = 56;
  const ANGLE_STEP = 0.6; // Slightly wider for clarity
  const RADIUS_OFFSET = 60; // Moderate center spacing
  const GROWTH_FACTOR = 95; 
  const POWER = 0.5; // Near-linear density for a more natural look
  const BASE_SIZE = 120;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden bg-background/20">
      <div className="relative w-0 h-0 animate-spin-extremely-slow">
        {Array.from({ length: PIZZA_COUNT }).map((_, i) => {
          const theta = i * ANGLE_STEP;
          const radius = RADIUS_OFFSET + GROWTH_FACTOR * Math.pow(i, POWER);
          
          // Position relative to center
          const x = Math.cos(theta) * radius;
          const y = Math.sin(theta) * radius;
          
          // Style: more subtle gradient, fixed opacity
          const scale = 0.7 + (i / PIZZA_COUNT) * 0.3; // Slight growth to the edge
          const opacity = 1.0; 
          const rotationSpeed = 3 + (i % 5);
 // Individual rotation speed

          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 ease-out"
              style={{
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                opacity: opacity,
                zIndex: PIZZA_COUNT - i, // Inner pizzas on top? Or outer? Let's say inner on top for depth
              }}
            >
              <div 
                className="animate-spin-slow"
                style={{ animationDuration: `${rotationSpeed}s` }}
              >
                <div 
                  className="animate-bounce-slow"
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '3s'
                  }}
                >
                  <Pizza size={BASE_SIZE} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Decorative center piece */}
      <div className="relative z-50">
        <div className="animate-spin-slow" style={{ animationDuration: '4s' }}>
          <Pizza size={140} />
        </div>
      </div>
    </div>
  );
}
