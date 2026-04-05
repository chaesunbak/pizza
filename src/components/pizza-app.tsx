"use client";

import { useState, useEffect } from "react";
import { LetterInput } from "./letter-input";
import { LoadingScreen } from "./loading-screen";
import { PizzaAnimation } from "./pizza-animation";
import { SenderSuccess } from "./sender-success";
import { ReceiverSuccess } from "./receiver-success";
import { sendGAEvent } from "@next/third-parties/google";

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

  useEffect(() => {
    if (initialMessage) {
      sendGAEvent("event", "message_opened", {
        value: initialMessage,
        from: initialFrom || null,
      });
    }
  }, [initialMessage, initialFrom]);

  const handleLoadingComplete = () => {
    sendGAEvent("event", "loading_finished", { value: message });
    if (initialMessage) {
      setStatus("PLAYING");
    } else {
      setStatus("SENDER_SUCCESS");
    }
  };

  const handleSubmit = (text: string) => {
    setMessage(text);
    setStatus("LOADING");
    sendGAEvent("event", "message_created", { value: text });
    sendGAEvent("event", "loading_started", { value: text });
  };

  useEasterEgg();

  // Switch to success screen after animation
  useTimeout(
    () => {
      setStatus("RECEIVER_SUCCESS");
      sendGAEvent("event", "animation_completed", { value: message });
    },
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
        <ReceiverSuccess from={from} message={message} />
      )}
    </>
  );
}
