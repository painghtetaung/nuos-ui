import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils";

export interface ButtonLinkProps
  extends Omit<React.ComponentProps<"a">, "children" | "prefix" | "suffix">,
    VariantProps<typeof buttonLinkVariants> {
  asChild?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}

const buttonLinkVariants = cva(
  "inline-flex items-center gap-1 !text-body-sm cursor-pointer  font-medium  outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        link: "text-element-inverse-blue underline underline-offset-4",
        "text-link": "text-element-inverse-default",
        error: "text-element-inverse-red",
      },
    },
    defaultVariants: {
      variant: "link",
    },
  }
);

function ButtonLink({
  className,
  variant,
  prefix,
  suffix,
  disabled = false,
  asChild = false,
  children,
  ...props
}: ButtonLinkProps) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      className={cn(buttonLinkVariants({ variant }), className, {
        "text-element-inverse-disabled pointer-events-none hover:font-medium":
          disabled,
        "flex items-center gap-1": prefix || suffix,
      })}
      aria-disabled={disabled}
      {...props}
    >
      {prefix && prefix}
      <span>{children}</span>
      {suffix && suffix}
    </Comp>
  );
}

export { ButtonLink, buttonLinkVariants };
