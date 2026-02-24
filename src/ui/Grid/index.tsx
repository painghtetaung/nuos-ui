import { cn } from "@/utils";

interface GridProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}
export default function Grid({ children, className, ...props }: GridProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-4", className)} {...props}>
      {children}
    </div>
  );
}
