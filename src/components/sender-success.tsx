"use client";

import { useState } from "react";
import { Word } from "./word";
import { KeyboardButton } from "./keyboard-button";

export function SenderSuccess({
  message,
  from,
  setFrom,
}: {
  message: string;
  from: string;
  setFrom: (name: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCheck = () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("message", message);
    if (from.trim()) {
      url.searchParams.set("from", from.trim());
    }
    window.location.href = url.toString();
  };

  const handleCopy = async () => {
    // Use window.location.href to preserve the current path if deployed to a subpath
    const url = new URL(window.location.href);
    url.search = ""; // Clear existing params

    url.searchParams.set("message", message);

    if (from.trim()) {
      url.searchParams.set("from", from.trim());
    }

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // Fallback for non-secure contexts - can also use a temporary textarea
      alert(
        "Failed to copy directly. Please copy this link: " + url.toString(),
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 font-fredoka font-bold text-[clamp(1.5rem,8vw,3.5rem)] w-full px-6 py-20 text-center">
      <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
        <Word word="Your Pizza Is Ready!" />
      </div>

      <div className="flex flex-col gap-6 w-full max-w-md animate-in fade-in slide-in-from-bottom-12 delay-300 duration-700 fill-mode-both">
        <div className="flex flex-col gap-2 text-left px-2">
          <label
            htmlFor="from"
            className="text-xs md:text-sm font-fredoka text-black/40 uppercase tracking-widest font-bold"
          >
            Who is this pizza from? (optional)
          </label>
          <input
            id="from"
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Your name"
            className="w-full px-6 py-4 bg-white/50 border-2 border-dashed border-black/10 rounded-2xl font-fredoka text-xl focus:outline-none focus:border-orange-400 focus:bg-white transition-all duration-300 placeholder:text-black/20"
            autoComplete="off"
          />
        </div>

        <KeyboardButton
          onClick={handleCopy}
          variant={copied ? "success" : "white"}
          className="w-full py-5 text-xl md:text-2xl"
        >
          <span className="flex items-center justify-center gap-3">
            {copied ? <>COPIED!</> : <>COPY TO CLIPBOARD</>}
          </span>
        </KeyboardButton>

        <button
          onClick={handleCheck}
          className="group w-full py-4 rounded-xl font-fredoka text-lg md:text-xl text-black/60 hover:text-black hover:bg-black/5 transition-all duration-200"
        >
          <span className="flex items-center justify-center gap-2">
            Wanna try before sharing?
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
