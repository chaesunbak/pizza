"use client";

import Image from "next/image";
import PizzaImage from "@/assets/images/pizza.webp";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PizzaProps {
  className?: string;
  size?: number;
}

export function Pizza({ className, size = 384 }: PizzaProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div 
      className={cn(
        "relative overflow-hidden cursor-pointer pointer-events-auto transition-all duration-300 hover:scale-110 active:scale-95 select-none", 
        !isVisible && "opacity-0 pointer-events-none scale-0",
        className
      )} 
      style={{ width: size, height: size }}
      onClick={() => setIsVisible(false)}
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
