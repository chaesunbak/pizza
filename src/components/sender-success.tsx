"use client";

import { useState, useRef, useEffect } from "react";
import { Word } from "./word";
import { KeyboardButton } from "./keyboard-button";
import { sendGAEvent } from "@next/third-parties/google";
import { useTimeout } from "@/hooks/common";
import { cn } from "@/lib/utils";

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
  const [showCheck, setShowCheck] = useState(false);
  const [warning, setWarning] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audios/mech-keyboard-02.mp3");
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const hideWarning = () => setWarning("");
  useTimeout(hideWarning, warning ? 2000 : null);

  const showWarning = () => {
    setWarning("Sorry, English Letters and Numbers only!");
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.toUpperCase();
    const filteredValue = rawValue.replace(/[^A-Z0-9]/g, "").slice(0, 10);

    // If the length increased, play sound
    if (filteredValue.length > from.length) {
      playSound();
      hideWarning();
    }
    // If we filtered out some characters that the user tried to type
    else if (rawValue.length > 0 && /[^A-Z0-9]/.test(rawValue)) {
      showWarning();
    }

    setFrom(filteredValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && from.length > 0) {
      playSound();
    }
  };

  const handleCheck = () => {
    const url = new URL(window.location.href);
    const isDev = url.searchParams.get("dev") === "true";

    url.search = ""; // Clear existing params
    url.searchParams.set("message", message);
    if (from.trim()) {
      url.searchParams.set("from", from.trim());
    }
    if (isDev) {
      url.searchParams.set("dev", "true");
    }
    window.location.href = url.toString();
  };

  const handleCopy = async () => {
    const url = new URL(window.location.href);
    const isDev = url.searchParams.get("dev") === "true";

    url.search = ""; // Clear existing params
    url.searchParams.set("message", message);
    if (from.trim()) {
      url.searchParams.set("from", from.trim());
    }
    if (isDev) {
      url.searchParams.set("dev", "true");
    }

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setShowCheck(true);
      sendGAEvent("event", "share_link_copied", {
        value: message,
        from: from || null,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      alert(
        "Failed to copy directly. Please copy this link: " + url.toString(),
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 font-fredoka font-bold text-[clamp(1.5rem,8vw,3.5rem)] w-full px-6 py-20 text-center">
      {/* 안내 메시지 - 항상 상단에 노출 */}
      <div
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2 rounded-full bg-red-500/80 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-sans font-bold shadow-xl transition-all duration-300 pointer-events-none whitespace-nowrap z-60",
          warning ? "opacity-100 scale-100" : "opacity-0 scale-95",
          isShaking && "animate-shake",
        )}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          {warning}
        </span>
      </div>

      <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
        <Word word="Your Pizza" className="md:hidden" />
        <Word word="Is Ready!" className="md:hidden" />
        <Word word="Your Pizza Is Ready!" className="hidden md:flex" />
      </div>

      <div className="flex flex-col gap-6 w-full max-w-md animate-in fade-in slide-in-from-bottom-12 delay-300 duration-700 fill-mode-both">
        <div className="flex flex-col gap-2 text-left px-2">
          <label
            htmlFor="from"
            className="text-xs md:text-sm font-fredoka text-black/40 uppercase tracking-widest font-bold"
          >
            you can leave your name (if you want)
          </label>
          <input
            id="from"
            type="url"
            value={from}
            onChange={handleFromChange}
            onKeyDown={handleKeyDown}
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
            {copied ? (
              <>COPIED! NOW YOU CAN SEND IT!</>
            ) : (
              <>COPY TO CLIPBOARD</>
            )}
          </span>
        </KeyboardButton>

        <button
          onClick={handleCheck}
          className={`group w-full py-4 rounded-xl font-fredoka text-lg md:text-xl text-black/60 hover:text-black hover:bg-black/5 transition-all duration-500 ${
            showCheck
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            Wanna try some before sharing?
            <span className="animate-bounce-x inline-block">→</span>
          </span>
        </button>
      </div>
    </div>
  );
}
