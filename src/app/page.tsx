import { LetterInput } from "@/components/letter-input";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans transition-colors duration-500">
      <main className="flex flex-col items-center gap-8">
        <LetterInput />
      </main>
    </div>
  );
}
