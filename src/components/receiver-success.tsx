"use client";

import { Word } from "./word";
import { KeyboardButton } from "./keyboard-button";
import { sendGAEvent } from "@next/third-parties/google";

export function ReceiverSuccess({
  from,
  message,
}: {
  from?: string;
  message: string;
}) {
  const displayFrom = from ? from : "SOMEBODY";

  const handleReset = () => {
    sendGAEvent("event", "restart_from_received", {
      value: message,
      from: from || null,
    });

    const url = new URL(window.location.href);
    const isDev = url.searchParams.get("dev") === "true";

    // Navigate to base path to clear initialMessage/initialFrom props
    const newUrl = new URL("/", window.location.origin);
    if (isDev) {
      newUrl.searchParams.set("dev", "true");
    }

    window.location.href = newUrl.toString();
  };

  return (
    <div className="flex flex-col items-center gap-12 font-fredoka font-bold text-[clamp(1.2rem,6vw,2.5rem)] w-full px-6 py-20 text-center">
      <div className="flex flex-col items-center gap-6">
        <h2
          className="text-2xl text-white md:text-5xl font-fredoka font-bold tracking-wider min-h-[1.2em] opacity-0 animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          <span className="block md:inline">{`${displayFrom} SENT YOU`} </span>
          <span className="block md:inline">A MESSAGE</span>
        </h2>

        <div
          className="opacity-0 animate-reveal-text"
          style={{ animationDelay: "600ms" }}
        >
          <Word word={message} className="text-5xl md:text-8xl py-4" />
        </div>
      </div>

      <div
        className="flex flex-col gap-4 w-full max-w-sm opacity-0 animate-fade-up"
        style={{ animationDelay: "1100ms" }}
      >
        <KeyboardButton
          onClick={handleReset}
          className="w-full py-5 text-xl md:text-2xl"
        >
          <span className="flex items-center justify-center gap-3">
            SEND MINE TOO
          </span>
        </KeyboardButton>
      </div>
    </div>
  );
}
