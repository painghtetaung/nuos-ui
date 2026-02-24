import { cn } from "@/utils";
import { Label } from "@/ui/Label";
import type { RadioGroupProps } from "@radix-ui/react-radio-group";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import * as React from "react";

type Option = {
  label: string | React.ReactNode;
  value: string;
};

interface RadioProps extends Omit<
  React.ComponentProps<
    React.ForwardRefExoticComponent<
      RadioGroupProps & React.RefAttributes<HTMLDivElement>
    >
  >,
  "onChange" | "onSelect"
> {
  onSelect?: (value: string) => void;
  options: Option[];
}

function Radio({ onSelect, options, ...props }: RadioProps) {
  return (
    <BaseRadioGroup {...props}>
      {options.map((option) => {
        return (
          <Label
            htmlFor={option.value}
            key={option.value}
            className="hover:bg-surface-bg flex cursor-pointer items-center gap-x-2 rounded-lg p-1.5"
          >
            <BaseRadioGroupItem
              onClick={() => {
                onSelect?.(option.value.toString());
              }}
              id={option.value}
              value={option.value}
            />
            {option.label}
          </Label>
        );
      })}
    </BaseRadioGroup>
  );
}

export { Radio };

function BaseRadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={className}
      {...props}
    />
  );
}

function BaseRadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-border-primary-light group data-[state=checked]:border-border-secondary-normal data-[state=checked]:hover:border-border-secondary-dark bg-surface-bg-container hover:bg-primary-bg-soft text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-[20px] shrink-0 cursor-pointer rounded-full border-[2px] shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-check-box-and-radio-checked-enabled group-data-[state=checked]:hover:fill-check-box-and-radio-checked-hovered absolute top-1/2 left-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2 stroke-none" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
