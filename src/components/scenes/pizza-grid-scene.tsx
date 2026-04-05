"use client";

import { Pizza } from "../pizza";

export function PizzaGridScene() {
  const rows = 4;
  const pizzasPerRow = 10; 

  const renderRow = (moveRight: boolean) => {
    const marqueeClass = moveRight ? 'animate-marquee-right' : 'animate-marquee-left';
    const spinClass = moveRight ? 'animate-spin-slow' : 'animate-spin-slow-reverse';

    return (
      <div className="flex w-full overflow-hidden">
        <div className={`flex w-max ${marqueeClass}`}>
          {/* First set of pizzas */}
          <div className="flex shrink-0">
            {Array.from({ length: pizzasPerRow }).map((_, i) => (
              <div key={`set1-${i}`} className="p-4">
                <Pizza size={200} className={spinClass} />
              </div>
            ))}
          </div>
          {/* Duplicated set for seamless marquee */}
          <div className="flex shrink-0">
            {Array.from({ length: pizzasPerRow }).map((_, i) => (
              <div key={`set2-${i}`} className="p-4">
                <Pizza size={200} className={spinClass} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-between py-4 overflow-hidden z-0 pointer-events-none">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex-1 flex items-center">
          {/* i % 2 === 0 is the 1st, 3rd, 5th row (starting from top) */}
          {renderRow(i % 2 === 0)}
        </div>
      ))}
    </div>
  );
}
