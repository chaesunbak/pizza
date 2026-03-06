import Letter from "@/components/letter";

const LETTERS = [
  { char: "O", color: "#f472b6", rotate: -8 },
  { char: "H", color: "#fb923c", rotate: 5 },
  { char: "Y", color: "#4ade80", rotate: -4 },
  { char: "O", color: "#60a5fa", rotate: 12 },
];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans transition-colors duration-500">
      <main className="flex flex-col items-center gap-8">
        <div
          className="flex gap-2 p-8 bg-white/10 backdrop-blur-md rounded-4xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] font-fredoka"
          style={{ fontSize: "clamp(3rem, 15vw, 6rem)" }}
        >
          {LETTERS.map((letter, index) => (
            <Letter
              key={index}
              char={letter.char}
              color={letter.color}
              rotate={letter.rotate}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
