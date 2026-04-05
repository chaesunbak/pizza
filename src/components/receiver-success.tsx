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
      <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-1000 fill-mode-both">
        <div className="text-blue-500 scale-90">
          <Word word={`FROM ${displayFrom}`} />
        </div>

        <div className="flex flex-col gap-2 relative">
          <Word word="A MESSAGE" />
          <Word word="HAS ARRIVED!" />
        </div>

        <div className="mt-4 px-8 py-4 bg-orange-50 rounded-3xl border-2 border-orange-100 shadow-inner">
          <div className="text-orange-600 text-3xl md:text-5xl tracking-widest font-mono">
            {message}
          </div>
        </div>
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
