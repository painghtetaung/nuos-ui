import { cn } from "@/utils";

export interface GradientContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function GradientContainer(props: GradientContainerProps) {
  const { className, children, ...rest } = props;
  return (
    <div
      className={cn("gradient-bg flex px-[2.3px] py-[2px]", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

GradientContainer.Background = function GradientContainerBackground(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn("bg-fill-background h-full w-full", className)}
      {...rest}
    />
  );
};
