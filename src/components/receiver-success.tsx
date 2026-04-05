"use client";

import { Word } from "./word";
import { KeyboardButton } from "./keyboard-button";

export function ReceiverSuccess({
  from,
  message,
  onReset,
}: {
  from?: string;
  message: string;
  onReset: () => void;
}) {
  const displayFrom = from ? from : "SOMEBODY";

  return (
    <div className="flex flex-col items-center gap-12 font-fredoka font-bold text-[clamp(1.2rem,6vw,2.5rem)] w-full px-6 py-20 text-center">
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-1000 fill-mode-both">
        <h2 className="text-2xl text-white md:text-5xl font-fredoka font-bold tracking-wider min-h-[1.2em]">
          A MESSAGE HAS ARRIVED
        </h2>
        <h2 className="text-2xl text-white md:text-5xl font-fredoka font-bold tracking-wider min-h-[1.2em]">
          {`FROM ${displayFrom}`}
        </h2>

        <Word word={message} className="text-5xl md:text-8xl py-4" />
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm animate-in fade-in slide-in-from-bottom-12 delay-500 duration-1000 fill-mode-both">
        <KeyboardButton
          onClick={onReset}
          className="w-full py-5 text-xl md:text-2xl"
        >
          <span className="flex items-center justify-center gap-3">
            SEND A MESSAGE TOO
          </span>
        </KeyboardButton>
      </div>
    </div>
  );
}
