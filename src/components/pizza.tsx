"use client";

import { useState } from "react";
import Image from "next/image";
import PizzaImage from "@/assets/images/pizza.webp";
import { cn } from "@/lib/utils";

export function Pizza({
  className,
  size = 384,
  canHide = true,
}: {
  className?: string;
  size?: number;
  canHide?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      className={cn(
        "relative overflow-hidden select-none transition-all duration-300",
        canHide ? "cursor-pointer hover:scale-110 active:scale-95" : "cursor-default",
        "pointer-events-auto",
        !isVisible && "opacity-0 pointer-events-none scale-0",
        className,
      )}
      style={{ width: size, height: size }}
      onClick={() => {
        if (canHide) setIsVisible(false);
      }}
    >
      <Image
        src={PizzaImage}
        alt={`Pizza`}
        fill
        className="object-contain pointer-events-none"
        priority
        draggable={false}
      />
    </div>
  );
}
