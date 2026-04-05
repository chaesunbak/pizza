"use client";

import { useState } from "react";
import { LetterInput } from "./letter-input";
import { LoadingScreen } from "./loading-screen";
import { PizzaAnimation } from "./pizza-animation";

import type { MessageLetters } from "@/types";

type Status = "IDLE" | "LOADING" | "PLAYING";

export function PizzaApp({
  initialMessage,
}: {
  initialMessage?: string;
  initialFrom?: string;
}) {
  const [status, setStatus] = useState<Status>(
    initialMessage ? "LOADING" : "IDLE",
  );
  const [message, setMessage] = useState(initialMessage || "");

  const handleLoadingComplete = () => {
    setStatus("PLAYING");
  };

  const handleSubmit = (text: string) => {
    setMessage(text);
    setStatus("LOADING");
  };

  return (
    <>
      {status === "IDLE" && <LetterInput onSubmit={handleSubmit} />}
      {status === "LOADING" && (
        <LoadingScreen onComplete={handleLoadingComplete} duration={2500} />
      )}
      {status === "PLAYING" && (
        <PizzaAnimation
          letters={message.split("").slice(0, 5) as MessageLetters}
        />
      )}
    </>
  );
}
