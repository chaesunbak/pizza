import { memo } from "react";

export type LetterColor =
  | "pink"
  | "green"
  | "blue"
  | "orange"
  | "purple"
  | "yellow";

const colorMap: Record<LetterColor, { text: string; side: string }> = {
  pink: { text: "#FF73B3", side: "#D63D83" },
  green: { text: "#8CE354", side: "#5FAD2B" },
  blue: { text: "#52B1FF", side: "#277BC7" },
  orange: { text: "#FF9C3A", side: "#D16F17" },
  purple: { text: "#D285FF", side: "#943BBF" },
  yellow: { text: "#FFE94D", side: "#C2A821" },
};

function PureLetter({
  char,
  rotate,
  color,
}: {
  char: string;
  rotate: number;
  color: LetterColor;
}) {
  const selectedColor = colorMap[color];

  const shadowDepth = 5;
  const solidShadows = Array.from({ length: shadowDepth }).map(
    (_, i) => `0 ${i + 1}px 1px ${selectedColor.side}`,
  );

  const style: React.CSSProperties = {
    color: selectedColor.text,
    transform: `rotate(${rotate}deg)`,
    textShadow: `
      ${solidShadows.join(", ")},
      0 ${shadowDepth + 4}px 10px rgba(0,0,0,0.2)
    `,
    WebkitFontSmoothing: "antialiased",
  };

  return (
    <span
      className="font-fredoka font-bold inline-block transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
      style={style}
    >
      {char}
    </span>
  );
}

export const Letter = memo(PureLetter);
