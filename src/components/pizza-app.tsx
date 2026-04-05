"use client";

import { useState } from "react";
import { LetterInput } from "./letter-input";
import { LoadingScreen } from "./loading-screen";
import { PizzaAnimation } from "./pizza-animation";
import { SenderSuccess } from "./sender-success";
import { ReceiverSuccess } from "./receiver-success";

import { useEasterEgg } from "@/hooks/use-easter-egg";
import { useTimeout } from "@/hooks/common";
import type { MessageLetters, AppStatus } from "@/types";

const ANIMATION_DURATION = 45000; // 45 seconds of animation (9 scenes x 5s)

export function PizzaApp({
  initialMessage,
  initialFrom,
}: {
  initialMessage?: string;
  initialFrom?: string;
}) {
  const [status, setStatus] = useState<AppStatus>(
    initialMessage ? "LOADING" : "IDLE",
  );
  const [message, setMessage] = useState(initialMessage || "");
  const [from, setFrom] = useState(initialFrom || "");

  const handleLoadingComplete = () => {
    if (initialMessage) {
      setStatus("PLAYING");
    } else {
      setStatus("SENDER_SUCCESS");
    }
  };

  const handleSubmit = (text: string) => {
    setMessage(text);
    setStatus("LOADING");
  };

  const handleReset = () => {
    setMessage("");
    setFrom("");
    setStatus("IDLE");

    const url = new URL(window.location.href);
    const isDev = url.searchParams.get("dev") === "true";

    // Clear URL parameters but potentially preserve dev
    const newUrl = new URL(window.location.pathname, window.location.origin);
    if (isDev) {
      newUrl.searchParams.set("dev", "true");
    }

    window.history.replaceState({}, "", newUrl.toString());
  };

  useEasterEgg();

  // Switch to success screen after animation
  useTimeout(
    () => setStatus("RECEIVER_SUCCESS"),
    status === "PLAYING" ? ANIMATION_DURATION : null,
  );

  return (
    <>
      {status === "IDLE" && <LetterInput onSubmit={handleSubmit} />}

      {status === "LOADING" && (
        <LoadingScreen onComplete={handleLoadingComplete} duration={2500} />
      )}

      {status === "PLAYING" && (
        <PizzaAnimation
          letters={message.split("").slice(0, 5) as MessageLetters}
          message={message}
        />
      )}

      {status === "SENDER_SUCCESS" && (
        <SenderSuccess message={message} from={from} setFrom={setFrom} />
      )}

      {status === "RECEIVER_SUCCESS" && (
        <ReceiverSuccess from={from} message={message} onReset={handleReset} />
      )}
    </>
  );
}
