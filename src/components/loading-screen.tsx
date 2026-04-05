"use client";

import { useEffect, useState } from "react";
import { useInterval } from "@/hooks/common";

const MESSAGES = [
  "BAKING PIZZA...",
  "KNEADING THE DOUGH...",
  "SQUASHING TOMATOES...",
  "MELTING THE CHEESE...",
  "TEASING TASTEBUDS...",
  "STRETCHING DOUGH...",
  "ADDING EXTRA LOVE...",
  "THINKING ABOUT TOPPINGS...",
  "PIZZA-FYING YOUR MESSAGE...",
];

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export function LoadingScreen({
  onComplete,
  duration = 2000,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const stepTime = duration / 100;

  useInterval(
    () => {
      setProgress((prev) => {
        const next = prev < 100 ? prev + 1 : 100;
        return next;
      });
    },
    progress < 100 ? stepTime : null,
  );

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 200); // 짤막한 여유를 두고 완료 처리
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  useInterval(() => {
    setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
  }, 900);

  return (
    <div className="flex flex-col items-center justify-center gap-12 text-white">
      <div className="relative w-48 h-48 md:w-64 md:h-64 animate-bounce-slow"></div>
      <div className="flex flex-col items-center gap-2 md:gap-4 px-4 text-center">
        <h2 className="text-2xl md:text-5xl font-fredoka font-bold tracking-wider animate-pulse min-h-[1.2em]">
          {MESSAGES[messageIndex]}
        </h2>
        <div className="w-64 md:w-80 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
