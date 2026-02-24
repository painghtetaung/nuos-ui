import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "@/utils";

/**
 * position = where the whole tooltip is placed (side + alignment). Arrow follows: same edge and alignment.
 * E.g. "bottom-right" = tooltip below, aligned right; arrow on top edge at end (right).
 */
export type PositionProps =
  | "top"
  | "top-center"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "left"
  | "right";

type Side = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";

/** position = tooltip placement (side + align). No inversion. */
function parsePosition(position: string): {
  side: Side;
  align: Align | undefined;
} {
  const side: Side = /^top/.test(position)
    ? "top"
    : /^bottom/.test(position)
      ? "bottom"
      : /^left/.test(position)
        ? "left"
        : /^right/.test(position)
          ? "right"
          : "top";

  let align: Align | undefined;
  if (position.includes("-")) {
    if (position.endsWith("-center")) align = undefined;
    else if (/(left|top)$/.test(position)) align = "start";
    else if (/(right|bottom)$/.test(position)) align = "end";
  }

  return { side, align };
}

function getArrowPositionStyle(
  side: Side,
  align: Align | undefined
): React.CSSProperties {
  const offset = 0; // 0.75rem
  if (align === "start") {
    if (side === "top" || side === "bottom")
      return { left: offset, right: "auto", transform: undefined };
    return { top: offset, bottom: "auto", transform: undefined };
  }
  if (align === "end") {
    if (side === "top" || side === "bottom")
      return { right: offset, left: "auto", transform: undefined };
    return { bottom: offset, top: "auto", transform: undefined };
  }
  return {};
}

/** Optional: wrap a subtree to share tooltip delay/behavior. Each Tooltip has its own context by default. */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

// Main component: each Tooltip has its own Provider (separate context) so interactive content works when disableHoverableContent={false}.
function Tooltip({
  trigger,
  content,
  position = "top",
  withArrow = true,
  className,
  disableHoverableContent = true,
  ...props
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: PositionProps;
  withArrow?: boolean;
  className?: string;
  disableHoverableContent?: boolean;
} & React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const { side, align } = parsePosition(position);

  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        disableHoverableContent={disableHoverableContent}
        {...props}
      >
        <TooltipPrimitive.Trigger asChild data-slot="tooltip-trigger">
          {trigger}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            data-slot="tooltip-content"
            side={side}
            align={align}
            sideOffset={0}
            className={cn(
              disableHoverableContent && "pointer-events-none",
              "text-element-inverse-default-alt! font-medium bg-fill-inverse-slate-10 glass-effect rounded-unit-corner-radius-lg shadow-box",
              "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:invisible data-[state=closed]:hidden",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              "text-body-sm z-(--z-popover) w-fit origin-(--radix-tooltip-content-transform-origin) px-unit-8px py-unit-6px font-sans text-balance max-w-[500px]",
              className
            )}
          >
            {content}
            {withArrow && (
              <TooltipPrimitive.Arrow
                data-slot="tooltip-arrow"
                data-arrow-align={align}
                className="fill-fill-inverse-slate-10 z-(--z-popover)"
                style={{
                  ...getArrowPositionStyle(side, align),
                }}
              />
            )}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export { Tooltip, TooltipProvider };
