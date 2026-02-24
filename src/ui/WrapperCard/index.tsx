import { cn } from "@/utils";

type WrapperCardProps = {
  children: React.ReactNode;
  className?: string;
};

export const WrapperCard = (props: WrapperCardProps) => {
  const { children, className } = props;

  return (
    <div
      className={cn(
        "rounded-unit-corner-radius-5xl scrollbar-hide border-stroke-inverse-slate-02 bg-fill-foreground overflow-scroll border p-4",
        className
      )}
    >
      {children}
    </div>
  );
};
