"use client";

import { useEffect, useState } from "react";

import { Letter } from "./letter";
import { Word } from "./word";

import { getHash } from "@/lib/utils";
import { COLORS } from "@/lib/constant";

export function LetterInput() {
  const [text, setText] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Backspace") {
        setText((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        setText((prev) => {
          if (prev.length >= 5) return prev;
          return prev + e.key.toUpperCase();
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fontSize = "clamp(3.5rem, 18vw, 7.5rem)";

  return (
    <div
      className="flex flex-col items-center gap-12 font-fredoka font-bold"
      style={{ fontSize }}
    >
      <div className="uppercase">
        <Word word="Type Your" />
      </div>
      <div className="flex gap-[0.2em] p-[0.3em] bg-white/10 backdrop-blur-md rounded-[0.4em] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] h-[1.5em] box-content items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          const char = text[index];
          if (!char) {
            return (
              <div
                key={index}
                className="w-[1em] h-[1em] rounded-[0.2em] border-[0.05em] border-dashed border-white/20 flex items-center justify-center transition-all duration-300"
              />
            );
          }
          const hash = getHash(char, index);
          const color = COLORS[hash % COLORS.length];
          const rotate = (hash % 31) - 15;
          return (
            <div
              key={index}
              className="w-[1em] h-[1em] flex justify-center items-center"
            >
              <Letter char={char} color={color} rotate={rotate} />
            </div>
          );
        })}
      </div>

      <Word word="Message" />
    </div>
  );
}
