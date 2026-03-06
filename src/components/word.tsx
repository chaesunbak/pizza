import { memo } from "react";

import { getHash } from "@/lib/utils";
import { COLORS } from "@/lib/constant";

import { Letter } from "./letter";

function PureWord({ word }: { word: string }) {
  return (
    <div className="flex gap-[0.15em] md:gap-[0.2em] items-center">
      {word.split("").map((char, index) => {
        if (char === " ")
          return <div key={index} className="w-[0.3em] md:w-[0.4em]" />;
        const hash = getHash(char, index);
        const color = COLORS[hash % COLORS.length];
        const rotate = (hash % 31) - 15;
        return (
          <Letter
            key={index}
            char={char.toUpperCase()}
            color={color}
            rotate={rotate}
          />
        );
      })}
    </div>
  );
}

export const Word = memo(PureWord);
