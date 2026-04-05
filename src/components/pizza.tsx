import Image from "next/image";
import PizzaImage from "@/assets/images/pizza.webp";
import { cn } from "@/lib/utils";

interface PizzaProps {
  className?: string;
  size?: number;
}

export function Pizza({ className, size = 384 }: PizzaProps) {
  return (
    <div 
      className={cn("relative overflow-hidden", className)} 
      style={{ width: size, height: size }}
    >
      <Image
        src={PizzaImage}
        alt={`Pizza`}
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
