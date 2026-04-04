import Image from "next/image";
import PizzaImage from "@/assets/images/pizza.webp";

export function Pizza() {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 animate-spin-extremely-slow">
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
