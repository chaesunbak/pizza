"use client";

import { useState, useRef } from "react";
import { useTimeout } from "usehooks-ts";

import { Letter } from "./letter";
import { Word } from "./word";

import { getHash, cn } from "@/lib/utils";
import { COLORS } from "@/lib/constant";

export function LetterInput() {
  const [text, setText] = useState("");
  const [warning, setWarning] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hideWarning = () => setWarning("");

  // warning 값이 있을 때만 2초 타이머 작동
  useTimeout(hideWarning, warning ? 2000 : null);

  const showWarning = () => {
    setWarning("Sorry, Latin Letters only!");
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const handleChange = ({
    target: { value: newValue },
  }: React.ChangeEvent<HTMLInputElement>) => {
    // Check for non-English characters
    if (/[^a-zA-Z]/.test(newValue)) {
      showWarning();
    } else {
      hideWarning(); // Hide warning if valid English is entered
    }

    // Filter to keep only English letters and limit to 5 characters
    const filtered = newValue
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, 5)
      .toUpperCase();
    setText(filtered);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex flex-col items-center gap-8 md:gap-12 font-fredoka font-bold relative text-[clamp(2.2rem,12vw,7.5rem)] w-full px-6"
      onClick={handleFocus}
    >
      {/* 투명 input: 모바일 키보드 활성화를 위한 트릭 */}
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={handleChange}
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
            "absolute -bottom-14 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white text-xs md:text-base font-sans font-semibold shadow-lg transition-all pointer-events-none whitespace-nowrap z-10",
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
    </div>
  );
}
