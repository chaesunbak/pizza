"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PizzaGridScene } from "./scenes/pizza-grid-scene";
import { PizzaDiagonalScene } from "./scenes/pizza-diagonal-scene";
import { PizzaSnowScene } from "./scenes/pizza-snow-scene";
import { PizzaCheckerScene } from "./scenes/pizza-checker-scene";
import { PizzaOrbitScene } from "./scenes/pizza-orbit-scene";
import { PacmanScene } from "./scenes/pacman-scene";
import { PizzaCircleScene } from "./scenes/pizza-circle-scene";
import { PizzaSpiralScene } from "./scenes/pizza-spiral-scene";
import { PizzaGiantScene } from "./scenes/pizza-giant-scene";
import { getDeterministicShuffle } from "@/lib/utils";

import type { MessageLetters } from "@/types";

const SCENES = [
  { id: "grid", name: "Grid", component: PizzaGridScene },
  { id: "diagonal", name: "Diagonal", component: PizzaDiagonalScene },
  { id: "snow", name: "Snow", component: PizzaSnowScene },
  { id: "checker", name: "Checker", component: PizzaCheckerScene },
  { id: "orbit", name: "Orbit", component: PizzaOrbitScene },
  { id: "pacman", name: "Pacman", component: PacmanScene },
  { id: "circle", name: "Circle", component: PizzaCircleScene },
  { id: "spiral", name: "Spiral", component: PizzaSpiralScene },
  { id: "giant", name: "Giant", component: PizzaGiantScene },
];

import { MusicPlayer } from "./music-player";

function PizzaAnimationContent({
  letters,
  message,
}: {
  letters: MessageLetters;
  message: string;
}) {
  const searchParams = useSearchParams();
  const isDev = searchParams.get("dev") === "true";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);

  // Generate deterministic sequence of scenes
  const sequence = useMemo(() => {
    return getDeterministicShuffle(SCENES, message);
  }, [message]);

  useEffect(() => {
    if (!isAutoSwitching) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sequence.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isAutoSwitching, sequence.length]);

  const currentScene = isAutoSwitching
    ? sequence[currentIndex]
    : SCENES[currentIndex]; // In manual mode, we use the original SCENES index for simplicity in DevMenu

  const SceneComponent = currentScene.component;

  const handleSelectScene = (id: string) => {
    const index = SCENES.findIndex((s) => s.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsAutoSwitching(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {isDev && (
        <DevMenu
          currentSceneId={currentScene.id}
          onSelect={handleSelectScene}
          isAuto={isAutoSwitching}
          onToggleAuto={() => setIsAutoSwitching((prev) => !prev)}
        />
      )}
      <SceneComponent letters={letters} />
      <MusicPlayer />
    </div>
  );
}

export function PizzaAnimation({
  letters,
  message,
}: {
  letters: MessageLetters;
  message: string;
}) {
  return (
    <Suspense fallback={null}>
      <PizzaAnimationContent letters={letters} message={message} />
    </Suspense>
  );
}

function DevMenu({
  currentSceneId,
  onSelect,
  isAuto,
  onToggleAuto,
}: {
  currentSceneId: string;
  onSelect: (id: string) => void;
  isAuto: boolean;
  onToggleAuto: () => void;
}) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-lg px-6 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-100 flex items-center gap-6 text-[13px] font-semibold border border-white/20">
      <div className="flex bg-slate-100/80 p-1.5 rounded-xl gap-1">
        {SCENES.map((scene) => (
          <button
            key={scene.id}
            onClick={() => onSelect(scene.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              currentSceneId === scene.id
                ? "bg-white text-orange-600 shadow-md transform scale-105"
                : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
            }`}
          >
            {scene.name}
          </button>
        ))}
      </div>
      <div className="h-6 w-[1.5px] bg-slate-200" />
      <button
        onClick={onToggleAuto}
        className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-bold ${
          isAuto
            ? "bg-green-100 text-green-600 hover:bg-green-200"
            : "bg-orange-100 text-orange-600 hover:bg-orange-200 shadow-inner"
        }`}
      >
        {isAuto ? "● AUTOPLAY" : "■ MANUAL"}
      </button>
    </div>
  );
}
