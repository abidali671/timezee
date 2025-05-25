'use client'
import { Button } from "../../components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function AnimatedButton({
  children,
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClicked(true);
    setTimeout(() => setClicked(false), 400); // reset after animation
    onClick?.(e);
  };

  return (
    <Button
      variant="animated"
      onClick={handleClick}
      className={cn("relative overflow-hidden group", className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>

      <span
        className={cn(
          "absolute bottom-0 left-0 w-full h-1 bg-yellow-400 z-0 transition-all duration-300 ease-in-out",
          {
            "h-full": clicked, // on mobile click
            "group-hover:h-full": true, // on desktop hover
          }
        )}
      ></span>
    </Button>
  );
}
