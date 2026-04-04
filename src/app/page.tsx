import type { Metadata } from "next";

import { PizzaApp } from "@/components/pizza-app";

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
  const { message, from } = await searchParams;

  const rawMessage = typeof message === "string" ? message : undefined;
  const filteredMessage = rawMessage?.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  const displayMessage =
    filteredMessage && filteredMessage.length === 5 ? filteredMessage : undefined;

  const displayFrom = typeof from === "string" ? from : undefined;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans transition-colors duration-500 overflow-hidden">
      <main className="flex flex-col items-center justify-center w-full px-4">
        <PizzaApp initialMessage={displayMessage} initialFrom={displayFrom} />
      </main>
    </div>
  );
}
