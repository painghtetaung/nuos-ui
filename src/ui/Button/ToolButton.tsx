import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils";
import { Loader2Icon } from "lucide-react";

export interface ToolButtonProps
  extends Omit<React.ComponentProps<"button">, "prefix" | "suffix">,
    VariantProps<typeof toolButtonVariants> {
  state?: "loading" | "default";
  asChild?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onlyIcon?: boolean;
  children?: React.ReactNode;
}

const toolButtonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-body-sm font-medium transition-all disabled:pointer-events-none disabled:bg-button-bg-inactive [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[20px] shrink-0 [&_svg]:shrink-0 outline-none ring-0",
  {
    variants: {
      variant: {
        primary:
          "bg-button-bg-primaryDefault !text-white hover:bg-button-bg-primaryHover",
        outline:
          "border border-border-primary-light bg-button-bg-outlineDefault !text-text-default hover:bg-button-bg-outlineHover disabled:bg-button-bg-outlineDefault disabled:!text-text-inactive",
        destructive:
          "bg-button-bg-destructiveDefault !text-white hover:bg-button-bg-destructiveHover",
      },
      size: {
        md: "px-2.5 py-2 rounded-lg gap-2 text-body-sm",
        lg: "p-4 rounded-xl gap-2 text-body-sm",
      },
      state: {
        loading: "opacity-80 cursor-progress",
        default: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      state: "default",
    },
  },
);

function getToolButtonPadding(
  size: string,
  prefix: React.ReactNode,
  suffix: React.ReactNode,
  onlyIcon?: boolean,
): string {
  if (size === "md") {
    if (prefix && suffix) return "px-2";
    else if (prefix) return "pl-2 pr-2.5";
    else if (suffix) return "pr-2 pl-2.5";
    else if (onlyIcon) return "p-2";
  }
  return "p-4";
}

function ToolButton({
  className,
  variant,
  state,
  size,
  prefix,
  suffix,
  onlyIcon,
  asChild = false,
  children,
  ...props
}: ToolButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      type="button"
      className={cn(
        toolButtonVariants({ variant, size, className }),
        getToolButtonPadding(size || "md", prefix, suffix, onlyIcon || false),
      )}
      disabled={state === "loading" || props.disabled}
      {...props}
    >
      {state === "loading" && <Loader2Icon className="animate-spin" />}
      {prefix && prefix}
      {children}
      {suffix && suffix}
    </Comp>
  );
}

export { ToolButton, toolButtonVariants };
