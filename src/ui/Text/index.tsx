import { cn } from "@/utils";
import { forwardRef } from "react";

export const Text = forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p"> & {
    className?: string;
  }
>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <p
      ref={ref}
      className={cn(
        "text-body-sm! leading-body-sm text-element-inverse-default font-medium",
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
});

Text.displayName = "Text";
