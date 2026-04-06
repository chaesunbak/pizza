"use client";

import { cn } from "@/lib/utils";

interface KeyboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "white" | "success";
}

export function KeyboardButton({
  children,
  className,
  variant = "white",
  ...props
}: KeyboardButtonProps) {
  const variantStyles = {
    white:
      "bg-white text-black shadow-[0_8px_0_0_#ddd,0_12px_20px_0_rgba(0,0,0,0.1)]",
    success:
      "bg-green-500 text-white shadow-[0_8px_0_0_#16a34a,0_12px_20px_0_rgba(34,197,94,0.3)]",
  };

  return (
    <button
      className={cn(
        "group relative rounded-2xl font-fredoka transition-all hover:scale-105 active:shadow-none active:translate-y-2",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
