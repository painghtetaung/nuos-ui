import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, Minus } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils";
import { Label } from "@/ui/Label";

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  indeterminate?: boolean;
  value: string;
  label?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
};

function Checkbox({
  className,
  value,
  label,
  subLabel,
  ...props
}: CheckboxProps) {
  return (
    <div className="flex flex-nowrap items-start gap-2">
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer focus-visible:ring-effect-ring-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive rounded-unit-corner-radius-md size-4 h-5 w-5 shrink-0 border shadow-xs transition-shadow outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          "",
          "data-[state=unchecked]:hover:bg-fill-inverse-slate-02 data-[state=unchecked]:border-stroke-inverse-slate-03 data-[state=unchecked]:hover:border-stroke-static-slate-03 data-[state=unchecked]:disabled:bg-fill-inverse-slate-02 data-[state=unchecked]:disabled:border-stroke-inverse-slate-02",
          "",
          "data-[state=checked]:bg-check-box-and-radio-selected-enabled data-[state=checked]:text-element-static-white data-[state=checked]:active:bg-check-box-and-radio-selected-pressed data-[state=checked]:hover:bg-check-box-and-radio-selected-hovered data-[state=checked]:disabled:bg-check-box-and-radio-selected-disabled data-[state=checked]:disabled:border-stroke-inverse-slate-03 data-[state=checked]:border-transparent",
          className,
        )}
        id={props.id || value}
        checked={props.checked}
        onCheckedChange={
          props.onChange as unknown as (checked: boolean) => void
        }
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current transition-none"
        >
          {props.indeterminate ? (
            <Minus className="size-3.5" />
          ) : (
            <CheckIcon className="size-3.5" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <div className="flex flex-col gap-1">
        {label ? <Label htmlFor={props.id || value}>{label}</Label> : null}
        {subLabel ? (
          <Label
            htmlFor={props.id || value}
            className="text-element-inverse-gray! text-body-sm font-medium"
          >
            {subLabel}
          </Label>
        ) : null}
      </div>
    </div>
  );
}

export { Checkbox };
