"use client";

import { useState, useRef, useEffect } from "react";
import { useTimeout } from "@/hooks/common";

import { Letter } from "./letter";
import { Word } from "./word";
import { KeyboardButton } from "./keyboard-button";

import { getHash, cn } from "@/lib/utils";
import { COLORS } from "@/lib/constant";

export function LetterInput({
  onSubmit,
}: {
  onSubmit?: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const [warning, setWarning] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // warning 값이 있을 때만 2초 타이머 작동
  useTimeout(hideWarning, warning ? 2000 : null);

  const showWarning = () => {
    setWarning("Sorry, English Letters and Numbers only!");
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.toUpperCase();

    // Filter: only allow A-Z and 0-9
    const filteredValue = rawValue.replace(/[^A-Z0-9]/g, "").slice(0, 5);

    // If the length increased, play sound
    if (filteredValue.length > text.length) {
      playSound();
      hideWarning();
    }
    // If we filtered out some characters that the user tried to type
    else if (rawValue.length > 0 && /[^A-Z0-9]/.test(rawValue)) {
      showWarning();
    }

    setText(filteredValue);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && text.length > 0) {
      playSound();
    }

    if (e.key === "Enter" && text.length === 5) {
      playSound();
      onSubmit?.(text);
    }
  };

  // 5글자 입력 시 자동으로 포커스 유지 및 엔터 유도
  useEffect(() => {
    if (text.length === 5) {
      inputRef.current?.focus();
    }
  }, [text]);

  return (
    <div
      className="flex flex-col items-center gap-4 md:gap-6 font-fredoka font-bold relative text-[clamp(1.8rem,10vw,4rem)] w-full px-6 -translate-y-[15vh] md:translate-y-0 transition-transform duration-500"
      onClick={handleFocus}
    >
      <input
        id="message"
        ref={inputRef}
        type="url"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="characters"
        spellCheck="false"
      />

      <div className="uppercase cursor-text select-none">
        <Word word="Type Your" />
      </div>

      <div className="relative cursor-text select-none">
        <div className="flex gap-[0.15em] md:gap-[0.2em] p-[0.3em] rounded-[0.4em] h-[1.5em] box-content items-center justify-center">
          {Array.from({ length: 5 }).map((_, index) => {
            const char = text[index];
            if (!char) {
              return (
                <div
                  key={index}
                  className="w-[0.9em] h-[0.9em] md:w-[1em] md:h-[1em] rounded-[0.2em] border-[0.05em] border-dashed border-black/20 bg-black/5 flex items-center justify-center"
                />
              );
            }
            const hash = getHash(char, index);
            const color = COLORS[hash % COLORS.length];
            const rotate = (hash % 31) - 15;
            return (
              <div
                key={index}
                className="w-[0.9em] h-[0.9em] md:w-[1em] md:h-[1em] flex justify-center items-center"
              >
                <Letter char={char} color={color} rotate={rotate} />
              </div>
            );
          })}
        </div>

        {/* 안내 메시지 - 항상 상단에 노출 */}
        <div
          className={cn(
            "fixed top-[20%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2 rounded-full bg-red-500/80 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-sans font-bold shadow-xl transition-all duration-300 pointer-events-none whitespace-nowrap z-60",
            warning ? "opacity-100 scale-100" : "opacity-0 scale-95",
            isShaking && "animate-shake",
          )}
        >
          <span className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            {warning}
          </span>
        </div>
      </div>

      <div className="cursor-text select-none">
        <Word word="MESSAGE" />
      </div>

      {/* 5글자 입력 시 나타나는 제출 버튼 - 이제 흐름에 맞게 배치 및 부드러운 애니메이션 */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-in-out w-full justify-center",
          text.length === 5 ? "grid-rows-[1fr] opacity-100" : "opacity-0",
        )}
      >
        <div className="overflow-hidden flex flex-col items-center">
          <div className="py-2 md:py-4">
            <KeyboardButton
              onClick={() => onSubmit?.(text)}
              className="px-6 py-3 text-xl md:text-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                ORDER
                <span className="inline-block px-1.5 py-0.5 bg-black/10 rounded text-xs font-sans font-bold translate-y-[-1px]">
                  ⏎
                </span>
              </span>
            </KeyboardButton>
          </div>
        </div>
      </div>
    </div>
  );
}
