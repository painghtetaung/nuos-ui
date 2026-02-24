import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils";
import IconContainer from "@/ui/IconContainer";

const toggleDropdownRightButtonVariants = cva(
  "flex items-center justify-center group cursor-pointer transition-all",
  {
    variants: {
      variant: {
        primary:
          "bg-button-toggle-unselected-primary-enabled text-element-inverse-default hover:bg-button-toggle-unselected-primary-hovered active:bg-button-toggle-unselected-primary-pressed",
        secondary:
          "bg-button-toggle-unselected-secondary-enabled text-element-inverse-default hover:bg-button-toggle-unselected-secondary-hovered active:bg-button-toggle-unselected-secondary-pressed",
        destructive:
          "bg-button-toggle-unselected-destructive-enabled text-element-inverse-default hover:bg-button-toggle-unselected-destructive-hovered active:bg-button-toggle-unselected-destructive-pressed",
      },
      size: {
        md: "px-1 py-unit-10px h-full rounded-r-unit-corner-radius-xl rounded-l-unit-corner-radius-sm",
        lg: "px-1 py-3 h-full rounded-r-unit-corner-radius-2xl rounded-l-unit-corner-radius-md",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: true,
        variant: "primary",
        class:
          "bg-button-toggle-selected-primary-enabled text-element-static-white hover:bg-button-toggle-selected-primary-hovered active:bg-button-toggle-selected-primary-pressed",
      },
      {
        selected: true,
        variant: "secondary",
        class:
          "bg-button-toggle-selected-secondary-enabled text-element-static-white hover:bg-button-toggle-selected-secondary-hovered active:bg-button-toggle-selected-secondary-pressed",
      },
      {
        selected: true,
        variant: "destructive",
        class:
          "bg-button-toggle-selected-destructive-enabled text-element-static-white hover:bg-button-toggle-selected-destructive-hovered active:bg-button-toggle-selected-destructive-pressed",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      selected: false,
    },
  },
);

const toggleDropdownRightButtonIconVariants = cva(
  "flex items-center justify-center group cursor-pointer transition-all",
  {
    variants: {
      variant: {
        primary:
          "bg-button-toggle-unselected-primary-enabled text-element-inverse-default hover:bg-button-toggle-unselected-primary-hovered active:bg-button-toggle-unselected-primary-pressed",
        secondary:
          "bg-button-toggle-unselected-secondary-enabled text-element-inverse-default hover:bg-button-toggle-unselected-secondary-hovered active:bg-button-toggle-unselected-secondary-pressed",
        destructive:
          "bg-button-toggle-unselected-destructive-enabled text-element-inverse-default hover:bg-button-toggle-unselected-destructive-hovered active:bg-button-toggle-unselected-destructive-pressed",
      },
      size: {
        md: "px-1 py-unit-10px h-full rounded-r-unit-corner-radius-xl rounded-l-unit-corner-radius-sm",
        lg: "px-1 py-3 h-full rounded-r-unit-corner-radius-2xl rounded-l-unit-corner-radius-md",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        selected: true,
        variant: "primary",
        class:
          "bg-button-toggle-selected-primary-enabled text-element-static-white hover:bg-button-toggle-selected-primary-hovered active:bg-button-toggle-selected-primary-pressed",
      },
      {
        selected: true,
        variant: "secondary",
        class:
          "bg-button-toggle-selected-secondary-enabled text-element-static-white hover:bg-button-toggle-selected-secondary-hovered active:bg-button-toggle-selected-secondary-pressed",
      },
      {
        selected: true,
        variant: "destructive",
        class:
          "bg-button-toggle-selected-destructive-enabled text-element-static-white hover:bg-button-toggle-selected-destructive-hovered active:bg-button-toggle-selected-destructive-pressed",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      selected: false,
    },
  },
);

export interface ToggleDropdownRightButtonProps extends Omit<
  React.ComponentProps<"button">,
  "children" | "type"
> {
  variant?: "primary" | "secondary" | "destructive";
  type?: "text" | "icon";
  size?: "md" | "lg";
  selected?: boolean;
  children?: React.ReactNode;
}

function ToggleDropdownRightButton({
  className,
  variant = "primary",
  type = "text",
  size = "md",
  selected = false,
  children,
  ...props
}: ToggleDropdownRightButtonProps) {
  const iconClass = selected
    ? "text-element-static-white fill-element-static-white"
    : "text-element-inverse-default fill-element-inverse-default";

  // Check if children is a React element (likely an icon)
  const isIcon = React.isValidElement(children);

  return type === "text" ? (
    <button
      type="button"
      className={cn(
        toggleDropdownRightButtonVariants({ variant, size, selected }),
        className,
      )}
      {...props}
    >
      {isIcon ? (
        <IconContainer
          colorInFill={false}
          className={cn(
            iconClass,
            `${selected ? "[&_path]:!text-element-static-white [&_path]:!fill-element-static-white" : "[&_path]:!text-element-inverse-default [&_path]:!fill-element-inverse-default"}`,
          )}
          size={"md"}
        >
          {children}
        </IconContainer>
      ) : (
        children
      )}
    </button>
  ) : (
    <button
      type="button"
      className={cn(
        toggleDropdownRightButtonIconVariants({ variant, size, selected }),
        className,
      )}
      {...props}
    >
      <IconContainer
        colorInFill={false}
        className={cn(
          iconClass,
          `${selected ? "[&_path]:! text-element-static-white [&_path]:!fill-element-static-white" : "[&_path]:!text-element-inverse-default [&_path]:!fill-element-inverse-default"}`,
        )}
        size={"md"}
      >
        {children}
      </IconContainer>
    </button>
  );
}

export { ToggleDropdownRightButton, toggleDropdownRightButtonVariants };
