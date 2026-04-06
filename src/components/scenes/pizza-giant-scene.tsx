"use client";

import { useState, useRef } from "react";
import { Pizza } from "../pizza";
import { Letter } from "../letter";
import { getHash } from "@/lib/utils";
import { COLORS } from "@/lib/constant";
import type { MessageLetters } from "@/types";

export function PizzaGiantScene({ letters }: { letters?: MessageLetters }) {
  const messageLetters = letters || [];

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden bg-linear-to-b from-orange-400/10 to-transparent">
      <div className="relative flex items-center justify-center w-full h-full p-4">
        {/* Giant Pizza */}
        <div className="relative flex items-center justify-center">
          <Pizza
            size={1200}
            canHide={false}
            className="w-[98vw] h-[98vw] max-w-[1200px] max-h-[1200px] opacity-100 drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all duration-700"
          />

          {/* Letters as Draggable Toppings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-[75%] h-[75%] flex items-center justify-center gap-[0.05em]">
              {messageLetters.map((char, index) => {
                const hash = getHash(char, index);
                const color = COLORS[hash % COLORS.length];
                const initialX = (hash % 41) - 20;
                const initialY = ((hash >> 2) % 41) - 20;
                const toppingRotate = (hash % 31) - 15;

                return (
                  <DraggableTopping
                    key={`${char}-${index}`}
                    char={char}
                    color={color}
                    rotate={toppingRotate}
                    initialX={initialX}
                    initialY={initialY}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-orange-500/15 rounded-full blur-3xl animate-pulse delay-700" />
    </div>
  );
}

function DraggableTopping({
  char,
  color,
  rotate,
  initialX,
  initialY,
}: {
  char: string;
  color: import("../letter").LetterColor;
  rotate: number;
  initialX: number;
  initialY: number;
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const letterPosStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    letterPosStart.current = { x: position.x, y: position.y };

    // Set pointer capture to receive events even if the pointer leaves the element
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;

    setPosition({
      x: letterPosStart.current.x + dx,
      y: letterPosStart.current.y + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
      className={`select-none pointer-events-auto transition-transform duration-75 ${isDragging ? "scale-110 z-10" : "hover:scale-105"}`}
    >
      <Letter
        char={char.toUpperCase()}
        color={color}
        rotate={rotate}
        className="text-[clamp(4rem,24vw,16rem)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
        style={{ pointerEvents: "none" }} // Ensure dragging works on the container
      />
    </div>
  );
}
