"use client";

import { useEffect, useState } from "react";
import { LetterInput } from "./letter-input";
import { LoadingScreen } from "./loading-screen";
import { PizzaAnimation } from "./pizza-animation";
import { SenderSuccess } from "./sender-success";
import { ReceiverSuccess } from "./receiver-success";

import type { MessageLetters } from "@/types";

type Status =
  | "IDLE"
  | "LOADING"
  | "PLAYING"
  | "SENDER_SUCCESS"
  | "RECEIVER_SUCCESS";

export function PizzaApp({
  initialMessage,
  initialFrom,
}: {
  initialMessage?: string;
  initialFrom?: string;
}) {
  const [status, setStatus] = useState<Status>(
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
    // Clear URL parameters without page reload
    window.history.replaceState({}, "", window.location.pathname);
  };

  // Switch to success screen after animation
  useEffect(() => {
    if (status === "PLAYING") {
      const timer = setTimeout(() => {
        setStatus("RECEIVER_SUCCESS");
      }, 8000); // 8 seconds of animation
      return () => clearTimeout(timer);
    }
  }, [status]);

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

      {status === "SENDER_SUCCESS" && (
        <SenderSuccess
          message={message}
          from={from}
          setFrom={setFrom}
        />
      )}

      {status === "RECEIVER_SUCCESS" && (
        <ReceiverSuccess from={from} message={message} onReset={handleReset} />
      )}
    </>
  );
}
