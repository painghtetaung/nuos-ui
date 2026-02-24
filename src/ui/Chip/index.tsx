import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn, getInitials } from "@/utils";
import { Avatar } from "@/ui/Avatar";
import IconContainer from "@/ui/IconContainer";

type IconContainerProps = {
  colorInFill?: boolean;
  disableTheme?: boolean;
  type?: "static";
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
  className?: string;
  style?: React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

const chipVariants = cva(
  "inline-flex items-center justify-center border py-unit-4px px-unit-8px text-body-sm font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-5 gap-1 focus-visible:ring-0 overflow-hidden",
  {
    variants: {
      type: {
        rounded: "rounded-full",
        rectangle: "rounded-unit-corner-radius-lg",
      },
      color: {
        slate:
          "border-stroke-inverse-slate-03 text-element-inverse-default bg-chip-slate-enabled hover:bg-chip-slate-hovered",
        red: "border-stroke-inverse-red-01 text-element-inverse-red bg-chip-red-enabled hover:bg-chip-red-hovered",
        orange:
          "border-stroke-inverse-orange-01 text-element-inverse-orange bg-chip-orange-enabled hover:bg-chip-orange-hovered",
        amber:
          "border-stroke-inverse-amber-01 text-element-inverse-amber bg-chip-amber-enabled hover:bg-chip-amber-hovered",
        yellow:
          "border-stroke-inverse-yellow-01 text-element-inverse-yellow bg-chip-yellow-enabled hover:bg-chip-yellow-hovered",
        lime: "border-stroke-inverse-lime-01 text-element-inverse-lime bg-chip-lime-enabled hover:bg-chip-lime-hovered",
        green:
          "border-stroke-inverse-green-01 text-element-inverse-green bg-chip-green-enabled hover:bg-chip-green-hovered",
        emerald:
          "border-stroke-inverse-emerald-01 text-element-inverse-emerald bg-chip-emerald-enabled hover:bg-chip-emerald-hovered",
        teal: "border-stroke-inverse-teal-01 text-element-inverse-teal bg-chip-teal-enabled hover:bg-chip-teal-hovered",
        cyan: "border-stroke-inverse-cyan-01 text-element-inverse-cyan bg-chip-cyan-enabled hover:bg-chip-cyan-hovered",
        sky: "border-stroke-inverse-sky-01 text-element-inverse-sky bg-chip-sky-enabled hover:bg-chip-sky-hovered",
        blue: "border-stroke-inverse-blue-01 text-element-inverse-blue bg-chip-blue-enabled hover:bg-chip-blue-hovered",
        indigo:
          "border-stroke-inverse-indigo-01 text-element-inverse-indigo bg-chip-indigo-enabled hover:bg-chip-indigo-hovered",
        violet:
          "border-stroke-inverse-violet-01 text-element-inverse-violet bg-chip-violet-enabled hover:bg-chip-violet-hovered",
        purple:
          "border-stroke-inverse-purple-01 text-element-inverse-purple bg-chip-purple-enabled hover:bg-chip-purple-hovered",
        fuchsia:
          "border-stroke-inverse-fuchsia-01 text-element-inverse-fuchsia bg-chip-fuchsia-enabled hover:bg-chip-fuchsia-hovered",
        pink: "border-stroke-inverse-pink-01 text-element-inverse-pink bg-chip-pink-enabled hover:bg-chip-pink-hovered",
        rose: "border-stroke-inverse-rose-01 text-element-inverse-rose bg-chip-rose-enabled hover:bg-chip-rose-hovered",
      },
    },
    defaultVariants: {
      type: "rounded",
      color: "slate",
    },
  }
);

// Main component
function Chip({
  type,
  color,
  dot = false,
  icon,
  avatar,
  closeBtn = false,
  label,
  className,
  children,
  iconContainerProps,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof chipVariants> & {
    dot?: boolean;
    icon?: React.ReactNode;
    avatar?: string;
    closeBtn?:
      | false
      | {
          onClick: (e: React.MouseEvent) => void;
        };
    label: string;
    iconContainerProps?: IconContainerProps;
  }) {
  return (
    <span
      data-slot="chip"
      className={cn(
        chipVariants({ type, color }),
        "cursor-default gap-1 px-2 py-1",
        className,
        {
          "pl-1.5": dot || !!icon,
          "pl-1": !!avatar,
        }
      )}
      {...props}
    >
      {dot && <Dot color={color} className="size-2" />}
      {icon && (
        <IconContainer
          colorInFill={false}
          className={cn(
            "[&_path]:fill-(--iconColor)!",
            iconContainerProps?.className
          )}
          style={
            {
              ["--iconColor"]:
                (color ?? "slate") === "slate"
                  ? "var(--color-element-inverse-default)"
                  : `var(--color-element-inverse-${color ?? "slate"})`,
              ...iconContainerProps?.style,
            } as React.CSSProperties & { ["--iconColor"]: string }
          }
          {...iconContainerProps}
        >
          {icon}
        </IconContainer>
      )}
      {avatar && (
        <Avatar
          variant="image"
          size="xs"
          imgsrc={avatar}
          fallback={getInitials(label)}
          tooltip={label}
        />
      )}
      {label && (
        <p className="leading-body-sm text-body-sm truncate font-medium">
          {label}
        </p>
      )}
      {closeBtn && (
        <X
          size={20}
          className="cursor-pointer"
          onClick={(e) => {
            if (!closeBtn) return;
            closeBtn.onClick(e);
          }}
        />
      )}
      {children}
    </span>
  );
}

export { Chip, chipVariants };

// Dot component
const dotVariants = cva("size-3 rounded-full p-0.5", {
  variants: {
    color: {
      slate: "bg-element-inverse-default",
      red: "bg-element-inverse-red",
      orange: "bg-element-inverse-orange",
      amber: "bg-element-inverse-amber",
      yellow: "bg-element-inverse-yellow",
      lime: "bg-element-inverse-lime",
      green: "bg-element-inverse-green",
      emerald: "bg-element-inverse-emerald",
      teal: "bg-element-inverse-teal",
      cyan: "bg-element-inverse-cyan",
      sky: "bg-element-inverse-sky",
      blue: "bg-element-inverse-blue",
      indigo: "bg-element-inverse-indigo",
      violet: "bg-element-inverse-violet",
      purple: "bg-element-inverse-purple",
      fuchsia: "bg-element-inverse-fuchsia",
      pink: "bg-element-inverse-pink",
      rose: "bg-element-inverse-rose",
    },
  },
  defaultVariants: {
    color: "slate",
  },
});

function Dot({
  className,
  color,
  ...props
}: VariantProps<typeof dotVariants> & { className?: string }) {
  return <div className={cn(dotVariants({ color }), className)} {...props} />;
}
