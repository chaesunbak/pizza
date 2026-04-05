"use client";

import { useState, useRef, useEffect } from "react";
import { useTimeout } from "usehooks-ts";

import { Letter } from "./letter";
import { Word } from "./word";
import { KeyboardButton } from "./keyboard-button";

import { getHash, cn } from "@/lib/utils";
import { COLORS } from "@/lib/constant";

const KOREAN_MAPPING: Record<string, string> = {
  // Consonants
  ㄱ: "R",
  ㄴ: "S",
  ㄷ: "E",
  ㄹ: "F",
  ㅁ: "A",
  ㅂ: "Q",
  ㅅ: "T",
  ㅇ: "D",
  ㅈ: "W",
  ㅊ: "C",
  ㅋ: "Z",
  ㅌ: "X",
  ㅍ: "V",
  ㅎ: "G",
  // Vowels
  ㅏ: "K",
  ㅑ: "I",
  ㅓ: "J",
  ㅕ: "U",
  ㅗ: "H",
  ㅛ: "Y",
  ㅜ: "N",
  ㅠ: "B",
  ㅡ: "M",
  ㅣ: "L",
  ㅐ: "O",
  ㅔ: "P",
  // Double Consonants / Vowels
  ㄲ: "R",
  ㄸ: "E",
  ㅃ: "Q",
  ㅆ: "T",
  ㅉ: "W",
  ㅒ: "O",
  ㅖ: "P",
};

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

  const handleChange = ({
    target: { value: newValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    // Map Korean characters to English equivalents
    const mappedValue = Array.from(newValue)
      .map((char) => KOREAN_MAPPING[char] || char)
      .join("");

    // Check for non-alphanumeric characters
    if (/[^a-zA-Z0-9]/.test(mappedValue)) {
      showWarning();
    } else {
      hideWarning(); // Hide warning if valid alphanumeric is entered
    }

    // Filter to keep only English letters and numbers, and limit to 5 characters
    const filtered = mappedValue
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 5)
      .toUpperCase();

    if (filtered !== text) {
      setText(filtered);
    }
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Play sound for all "typing" keys, even if they don't change the text (like hitting character limit)
    // We ignore modifier keys to avoid noise on Shift, Meta, etc.
    if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) {
      playSound();
    } else if (e.key === "Backspace" || e.key === "Enter") {
      playSound();
    }

    if (e.key === "Enter" && text.length === 5) {
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
      className="flex flex-col items-center gap-4 md:gap-6 font-fredoka font-bold relative text-[clamp(1.8rem,10vw,4rem)] w-full px-6"
      onClick={handleFocus}
    >
      <input
        ref={inputRef}
        type="text"
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

        {/* 안내 메시지 - 메시지에만 shake 애니메이션 적용 */}
        <div
          className={cn(
            "fixed bottom-12 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white text-xs md:text-sm font-sans font-semibold shadow-lg transition-all pointer-events-none whitespace-nowrap z-60",
            warning ? "opacity-100 translate-y-0 scale-100" : "opacity-0",
            isShaking && "animate-shake",
          )}
        >
          {warning}
        </div>
      </div>

      <div className="cursor-text select-none">
        <Word word="Message" />
      </div>

      {/* 5글자 입력 시 나타나는 제출 버튼 - 화면 하단 고정 */}
      <div
        className={cn(
          "fixed bottom-12 left-1/2 -translate-x-1/2 transition-all duration-500 z-50",
          text.length === 5
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-90 pointer-events-none",
        )}
      >
        <KeyboardButton
          onClick={() => onSubmit?.(text)}
          className="px-8 py-4 text-2xl md:text-3xl"
        >
          <span className="relative z-10 flex items-center gap-3">
            ENTER TO SUBMIT
            <span className="hidden md:inline-block px-2 py-1 bg-black/10 rounded text-sm font-sans font-bold">
              ⏎
            </span>
          </span>
        </KeyboardButton>
      </div>
    </div>
  );
}
