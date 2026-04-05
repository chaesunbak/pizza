"use client";

import { Pizza } from "../pizza";

export function PizzaDiagonalScene() {
  const rows = 12;
  const pizzasPerRow = 12;

  const renderRow = () => {
    return (
      <div className="flex w-full overflow-hidden">
        <div className="flex w-max animate-marquee-right">
          {/* First set of pizzas */}
          <div className="flex shrink-0">
            {Array.from({ length: pizzasPerRow }).map((_, i) => (
              <div key={`set1-${i}`} className="p-4">
                <Pizza size={150} className="animate-spin-slow" />
              </div>
            ))}
          </div>
          {/* Duplicated set for seamless marquee */}
          <div className="flex shrink-0">
            {Array.from({ length: pizzasPerRow }).map((_, i) => (
              <div key={`set2-${i}`} className="p-4">
                <Pizza size={150} className="animate-spin-slow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none bg-[#e5857e]">
      <div className="w-[180vmax] h-[180vmax] rotate-45 flex flex-col justify-around py-12 shrink-0">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex-1 flex items-center">
            {renderRow()}
          </div>
        ))}
      </div>
    </div>
  );
}
