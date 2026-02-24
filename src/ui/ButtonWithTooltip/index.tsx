import type { TooltipProps } from "@radix-ui/react-tooltip";
import type { ComponentProps } from "react";
import { Tooltip } from "@/ui/Tooltip";

export default function ButtonWithTooltip({
  tooltip,
  button,
}: {
  tooltip: Omit<ComponentProps<typeof Tooltip>, "trigger">;
  button: React.ReactNode;
}) {
  return <Tooltip {...tooltip} trigger={button} />;
}
