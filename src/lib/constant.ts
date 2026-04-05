import type { LetterColor } from "../components/letter";

export const COLORS = [
  "pink",
  "green",
  "blue",
  "orange",
  "purple",
  "yellow",
] as const satisfies LetterColor[];

export const KOREAN_MAPPING: Record<string, string> = {
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
