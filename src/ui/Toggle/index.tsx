import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium disabled:pointer-events-none disabled:text-icon-inactive data-[state=on]:disabled:text-icon-inactive data-[state=on]:disabled:bg-toggle-bg-inactiveDefault data-[state=on]:bg-toggle-bg-activeDefault data-[state=on]:hover:bg-toggle-bg-activeHover data-[state=on]:text-icon-white hover:bg-toggle-bg-inactiveHover hover:text-icon-default [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap cursor-pointer",
  {
    variants: {
      shape: {
        rectangle: "rounded-md",
        rounded: "rounded-full",
      },
      style: {
        ghost: "bg-transparent hover:bg-transparent",
        outline:
          "border border-border-primary-light bg-toggle-bg-inactiveDefault",
        soft: "bg-button-soft-enabled",
      },
      size: {
        sm: "h-7 px-1 min-w-7",
        md: "h-8 px-1.5 min-w-8",
        lg: "h-9 px-2.5 min-w-9",
      },
    },
    defaultVariants: {
      shape: "rectangle",
      style: "soft",
      size: "sm",
    },
  },
);

function Toggle({
  className,
  active,
  shape,
  style,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    active?: boolean;
  }) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ shape, style, size, className }))}
      pressed={active}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
