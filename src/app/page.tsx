import type { Metadata } from "next";

import { LetterInput } from "@/components/letter-input";
import { Word } from "@/components/word";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { from } = await searchParams;
  const displayFrom = typeof from === "string" ? from : undefined;

  const title = displayFrom
    ? `${displayFrom.charAt(0).toUpperCase() + displayFrom.slice(1).toLowerCase()} sent you a message`
    : "PIZZA";

  return {
    title,
    openGraph: {
      title,
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  // TODO : message, from이 5글자 초과할 수 있음, 영문자 이외의 문자 포함될수 있음
  const { message, from } = await searchParams;

  const displayMessage = typeof message === "string" ? message : undefined;
  const displayFrom = typeof from === "string" ? from : undefined;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans transition-colors duration-500">
      <main className="flex flex-col items-center gap-8">
        {displayMessage ? (
          <>
            <Word word={displayMessage} />
            {displayFrom && <Word word={`from ${displayFrom}`} />}
          </>
        ) : (
          <LetterInput />
        )}
      </main>
    </div>
  );
}
