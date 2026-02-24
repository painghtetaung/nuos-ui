import { cn } from "@/utils";
import { cva } from "class-variance-authority";
import { Button, type ButtonProps } from "@/ui/Button";
import IconContainer from "@/ui/IconContainer";

type IconButtonSize = "xs" | "sm" | "md" | "lg";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  disableTheme?: boolean;
  varient?: ButtonProps["variant"];
  size?: IconButtonSize;
  active?: boolean;
  colorInFill?: boolean;
  rounded?: boolean;
}

const iconButtonVariants = cva(
  "cursor-pointer flex items-center justify-center disabled:pointer-events-none disabled:text-element-inverse-disabled",
  {
    variants: {
      size: {
        xs: "p-unit-4px rounded-unit-corner-radius-lg w-[26px] h-[26px]",
        sm: "p-unit-4px rounded-unit-corner-radius-lg w-7 h-7",
        md: "p-unit-10px rounded-unit-corner-radius-xl w-10 h-10",
        lg: "p-unit-12px rounded-unit-corner-radius-2xl w-12 h-12",
      },
      active: {
        true: "ring ring-offset-1 ring-stroke-inverse-blue-02! border border-stroke-inverse-slate-01 bg-menu-panel-selected-enabled ",
      },
      rounded: {
        true: "!rounded-unit-corner-radius-rounded-full",
      },
    },
  }
);

export default function IconButton({
  icon,
  varient = "primary",
  size = "sm",
  rounded = false,
  active = false,
  className,
  colorInFill = true,
  disableTheme = false,
  ...props
}: IconButtonProps) {
  const iconSize =
    size === "xs"
      ? "xs"
      : size === "sm"
        ? "sm"
        : size === "md"
          ? "sm"
          : size === "lg"
            ? "md"
            : "md";
  return (
    <Button
      type="button"
      className={cn(iconButtonVariants({ size, rounded, active }), className)}
      variant={varient}
      {...props}
    >
      <IconContainer
        colorInFill={colorInFill}
        disableTheme={disableTheme}
        className={cn({
          // "[&_path]:fill-element-inverse-disabled!": props.disabled,
        })}
        size={iconSize}
      >
        {icon}
      </IconContainer>
    </Button>
  );
}
