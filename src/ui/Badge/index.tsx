import { cn } from "@/utils";
import { cva } from "class-variance-authority";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import IconContainer from "@/ui/IconContainer";

const BadgeVariants = cva(
  "w-full !text-caption leading-caption cursor-default flex max-w-fit items-center justify-center gap-0.5 font-medium",
  {
    variants: {
      type: {
        // primary: "bg-fill-static-blue-03 text-element-static-white",
        "primary-hard": "bg-fill-static-blue-03 text-element-static-white",
        "primary-soft": "bg-fill-inverse-blue-02 text-element-inverse-blue",
        "destructive-hard": "bg-fill-static-red-03 text-element-static-white",
        "destructive-soft": "bg-fill-inverse-red-02 text-element-inverse-red",
        "secondary-hard":
          "bg-fill-inverse-slate-09 text-element-inverse-default-alt",
        "secondary-soft":
          "bg-fill-inverse-slate-03 text-element-inverse-default",
      },
      size: {
        sm: "rounded-unit-corner-radius-sm py-unit-0px px-unit-4px",
        md: "rounded-unit-corner-radius-md py-unit-2px px-unit-6px",
      },
    },
  },
);

interface BadgeProps {
  type?:
    | "primary-hard"
    | "primary-soft"
    | "destructive-hard"
    | "destructive-soft"
    | "secondary-hard"
    | "secondary-soft";
  size?: "sm" | "md";
  rounded?: boolean;
  children: React.ReactNode;
  className?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

// Main component
const Badge = ({
  type = "primary-hard",
  children,
  size = "sm",
  className,
  rounded = false,
  prefixIcon,
  suffixIcon,
}: BadgeProps) => {
  return (
    <BaseBadge
      className={cn(
        BadgeVariants({ type, size }),
        className,
        rounded ? "!rounded-full" : "",
      )}
    >
      {prefixIcon && (
        <IconContainer
          className={cn(
            "h-5 w-5 p-0.5",
            type.includes("hard")
              ? "[&_path]:fill-current"
              : "[&_path]:fill-current",
          )}
        >
          {prefixIcon}
        </IconContainer>
      )}
      {children}
      {suffixIcon && (
        <IconContainer
          className={cn(
            "h-5 w-5 p-0.5",
            type.includes("hard")
              ? "[&_path]:fill-current"
              : "[&_path]:fill-current",
          )}
        >
          {suffixIcon}
        </IconContainer>
      )}
    </BaseBadge>
  );
};

// Base components
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function BaseBadge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, BaseBadge };
