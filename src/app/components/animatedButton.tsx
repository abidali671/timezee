import { Button } from "../../components/ui/button";
import { cn } from "@/lib/utils";

export function AnimatedButton({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="animated"
      className={cn("relative overflow-hidden group", className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-1 group-hover:h-full bg-yellow-400 transition-all duration-300 ease-in-out z-0"></span>
    </Button>
  );
}
