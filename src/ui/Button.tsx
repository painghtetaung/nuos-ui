import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";
import * as React from "react";
import { cn } from "../utils";

export interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "prefix" | "suffix"> {
  variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost" | "soft" | "ai-filled" | "ai-outline" | "glass" | null;
  size?: "sm" | "md" | "lg";
  state?: "loading" | "default";
  asChild?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onlyIcon?: boolean;
  label?: string;
  url?: string;
  children?: React.ReactNode;
}

const buttonVariants = cva(
  "flex group leading-body-sm line-height-body-sm items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[20px] shrink-0 [&_svg]:shrink-0 outline-none ring-0",
  {
    variants: {
      variant: {
        // default:
        //   "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        primary:
          "bg-button-primary-enabled text-element-static-white! hover:bg-button-primary-hovered active:bg-button-primary-pressed focus-visible:bg-button-primary-pressed disabled:bg-button-primary-disabled disabled:text-element-inverse-disabled!",
        secondary:
          "bg-button-secondary-enabled text-element-inverse-default-alt! hover:bg-button-secondary-hovered active:bg-button-secondary-pressed disabled:bg-button-secondary-disabled disabled:text-element-inverse-disabled!",
        destructive:
          "bg-button-destructive-enabled text-element-static-white! hover:bg-button-destructive-hovered active:bg-button-destructive-pressed disabled:bg-button-destructive-disabled disabled:text-element-inverse-disabled!",
        outline:
          "border border-stroke-inverse-slate-03 text-element-inverse-default rounded-unit-corner-radius-lg bg-button-outline-enabled hover:bg-button-outline-hovered active:bg-button-outline-pressed disabled:bg-button-outline-disabled disabled:text-element-inverse-disabled!",
        ghost:
          "bg-transparent text-element-inverse-default hover:bg-button-ghost-hovered active:bg-button-ghost-pressed disabled:bg-button-ghost-disabled disabled:text-element-inverse-disabled!",
        soft: "bg-button-soft-enabled text-element-inverse-default hover:bg-button-soft-hovered active:bg-button-soft-pressed disabled:bg-button-soft-disabled disabled:text-element-inverse-disabled!",
        "ai-filled": "relative",
        "ai-outline": "relative",
        glass:
          "glass-effect bg-button-glass-enabled border border-stroke-inverse-slate-01 hover:bg-button-glass-hovered active:bg-button-glass-pressed disabled:bg-button-glass-disabled",
      },
      size: {
        sm: "rounded-lg gap-1 px-1.5 py-1 text-body-sm",
        // "icon-sm": "p-4px rounded-md ",
        md: "px-2.5 py-2 rounded-[10px] gap-2 text-body-sm",
        // "icon-md": "rounded-lg p-2",
        lg: "px-3.5 py-3 rounded-xl gap-2 text-body-lg",
        // "icon-lg": "rounded-xl p-3",
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
  }
);

function getButtonPadding(
  size: string,
  prefix: React.ReactNode,
  suffix: React.ReactNode,
  onlyIcon?: boolean
): string {
  if (prefix && suffix) {
    if (size === "sm") return "px-1.5";
    if (size === "md") return "p-2.5";
    if (size === "lg") return "px-3";
  } else if (prefix) {
    if (size === "sm") return "pl-1.5 pr-2";
    if (size === "md") return "pl-2.5 py-2.5 pr-3";
    if (size === "lg") return "pl-3.5 pr-4";
  } else if (suffix) {
    if (size === "sm") return "pr-1.5 pl-2";
    if (size === "md") return "pl-3";
    if (size === "lg") return "pr-3.5 pl-4";
  } else if (onlyIcon) {
    if (size === "sm") return "p-1";
    if (size === "md") return "p-2";
    if (size === "lg") return "p-3";
  }
  return "";
}

function Button({
  className,
  variant = "primary",
  state,
  size = "md",
  prefix,
  suffix,
  onlyIcon,
  label,
  url,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = state === "loading" || props.disabled;
  const content = children ?? label;
  const handleClick = url
    ? (e: React.MouseEvent<HTMLButtonElement>) => { props.onClick?.(e); window.open(url, "_blank"); }
    : props.onClick;

  const renderAffix = (node?: React.ReactNode) => {
    if (!node) return null;
    if (React.isValidElement(node)) {
      const nodeElement = node as React.ReactElement<{ className?: string }>;
      return React.cloneElement(nodeElement, {
        className: cn(
          nodeElement.props?.className || "",
          isDisabled && "text-element-inverse-disabled"
        ),
      });
    }
    return node;
  };

  if (variant === "ai-filled" || variant === "ai-outline") {
    const isAiFilled = variant === "ai-filled";

    return (
      <Comp
        data-variant={variant}
        data-slot="button"
        className={cn("group relative cursor-pointer p-0.5")}
        disabled={isDisabled}
        {...props}
        onClick={handleClick}
      >
        <div
          className={cn(
            "absolute inset-0 block",
            buttonVariants({ size, className })
          )}
          style={{
            backgroundImage: `url(${""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className={cn(
            buttonVariants({ variant, size, className }),
            size === "sm" && "rounded-[7px]",
            size === "md" && "rounded-[9px]",
            size === "lg" && "rounded-[11px]",
            getButtonPadding(size, prefix, suffix, onlyIcon),
            {
              "gap-1": size === "sm",
              "hover:text-element-inverse-default text-white hover:bg-white":
                isAiFilled,
              "text-element-inverse-default dark:bg-fill-background bg-white hover:bg-transparent hover:text-white":
                !isAiFilled,
            }
          )}
        >
          {state === "loading" && <Loader2Icon className="animate-spin" />}
          {renderAffix(prefix)}
          {content}
          {renderAffix(suffix)}
        </div>
      </Comp>
    );
  }

  return (
    <Comp
      data-variant={variant}
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        getButtonPadding(size || "md", prefix, suffix, onlyIcon || false)
      )}
      disabled={isDisabled}
      {...props}
      onClick={handleClick}
    >
      {state === "loading" && <Loader2Icon className="animate-spin" />}
      {renderAffix(prefix)}
      {content}
      {renderAffix(suffix)}
    </Comp>
  );
}

export { Button };
