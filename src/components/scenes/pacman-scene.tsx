"use client";

import Image from "next/image";
import pacmanImg from "@/assets/images/pacman.webp";
import { Letter } from "../letter";
import type { MessageLetters } from "@/types";

export function PacmanScene({ letters }: { letters: MessageLetters }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none">
      {/* Track for Pacman and letters */}
      <div className="relative w-full h-32 flex items-center">
        {/* Letters container - Full screen width distribution */}
        <div className="absolute inset-0 flex items-center justify-around px-[15vw]">
          {letters.map((char, index) => {
            return (
              <div
                key={index}
                className="relative"
                style={{
                  animation: `letter-eat-${(index % 5) + 1} 6s linear infinite`,
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
          className="absolute"
          style={{
            width: "12rem",
            height: "12rem",
            top: "50%",
            animation: "pacman-move 6s linear infinite",
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
