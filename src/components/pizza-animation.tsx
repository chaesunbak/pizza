"use client";

import { useState, useEffect } from "react";
import { PizzaGridScene } from "./scenes/pizza-grid-scene";

import type { MessageLetters } from "@/types";

const SCENES = [
  { id: "grid", component: PizzaGridScene },
  // more scenes can be added here
];

export function PizzaAnimation({ letters }: { letters: MessageLetters }) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  useEffect(() => {
    // Logic for randomly switching scenes every 15 seconds
    if (SCENES.length <= 1) return;

    const intervalId = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * SCENES.length);
      setCurrentSceneIndex(nextIndex);
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const SceneComponent = SCENES[currentSceneIndex].component;

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <SceneComponent />
    </div>
  );
}
