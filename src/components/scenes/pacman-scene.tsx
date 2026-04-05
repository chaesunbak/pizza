"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import pacmanImg from "@/assets/images/pacman.webp";
import { Letter } from "../letter";
import type { MessageLetters } from "@/types";

export function PacmanScene({ letters }: { letters: MessageLetters }) {
  const [eatenStatus, setEatenStatus] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const pacmanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cycleDuration = 6000; // 6 seconds total
    const moveDuration = 4800; // 4.8 seconds movement (80% of 6s)
    const travelStart = -20; // vw
    const travelEnd = 120; // vw

    // Spacing logic: justify-around px-[15vw] for 5 letters
    // Available space = 100vw - 30vw = 70vw.
    // Each column = 14vw. Center of nth column = 15 + 7 + (n * 14)
    const letterThresholds = [22, 36, 50, 64, 78];

    let animationFrameId: number;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = (currentTime - startTime) % cycleDuration;

      let currentX: number;
      if (elapsed < moveDuration) {
        const moveProgress = elapsed / moveDuration;
        currentX = travelStart + (travelEnd - travelStart) * moveProgress;
      } else {
        currentX = travelEnd; // Rest period
      }

      // Update Pacman position directly via ref for performance
      if (pacmanRef.current) {
        pacmanRef.current.style.left = `${currentX}vw`;
        pacmanRef.current.style.transform = `translate(0, -50%)`;
      }

      // Sync eaten status
      setEatenStatus((prev) => {
        let changed = false;
        const next = [...prev];

        // Reset if new cycle starts (elapsed is small)
        if (elapsed < 100 && prev.some((s) => s)) {
          return [false, false, false, false, false];
        }

        letterThresholds.forEach((threshold, index) => {
          // If pacman (at currentX) has reached the letter (at threshold)
          // Adjust for Pacman's mouth (approx half width of 12rem ~ 6vw)
          if (currentX + 6 >= threshold && !next[index]) {
            next[index] = true;
            changed = true;
          }
        });

        return changed ? next : prev;
      });

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none">
      {/* Track for Pacman and letters */}
      <div className="relative w-full h-32 flex items-center">
        {/* Letters container - Full screen width distribution */}
        <div className="absolute inset-0 flex items-center justify-around px-[15vw]">
          {letters.map((char, index) => {
            const isEaten = eatenStatus[index];

            return (
              <div
                key={index}
                className="relative transition-all duration-300 ease-out"
                style={{
                  opacity: isEaten ? 0 : 1,
                  transform: isEaten
                    ? "scale(0) translateY(20px)"
                    : "scale(1) translateY(0)",
                  // Simple pop-in when not eaten
                  animation:
                    !isEaten && eatenStatus.every((s) => !s)
                      ? "letter-pop 0.3s ease-out forwards"
                      : "none",
                }}
              >
                <Letter
                  char={char}
                  rotate={0}
                  color={
                    (["pink", "green", "blue", "orange", "purple"] as const)[
                      index % 5
                    ]
                  }
                  style={{ fontSize: "6rem" }}
                />
              </div>
            );
          })}
        </div>

        {/* Pacman */}
        <div
          ref={pacmanRef}
          className="absolute"
          style={{
            width: "12rem",
            height: "12rem",
            top: "50%",
            left: "-20vw",
            transform: "translate(0, -50%)",
          }}
        >
          <Image
            src={pacmanImg}
            alt="Pacman"
            width={192}
            height={192}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
