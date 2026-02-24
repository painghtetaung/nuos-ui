import { cn } from "@/utils";
import { Label } from "@/ui/Label";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

function Switch({
  className,
  label,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & { label?: string }) {
  return (
    <div className="flex items-center space-x-2">
      <SwitchPrimitive.Root
        data-slot="switch"
        id={props.id || label}
        className={cn(
          "peer data-[state=checked]:bg-button-switch-on-enabled data-[state=checked]:hover:bg-button-switch-on-hovered data-[state=checked]:disabled:bg-button-switch-on-disabled data-[state=unchecked]:bg-button-switch-off-enabled data-[state=unchecked]:hover:bg-button-switch-off-hovered data-[state=unchecked]:disabled:bg-button-switch-off-disabled focus-visible:border-input-border-primaryHover focus-visible:ring-effect-ring-primary dark:data-[state=unchecked]:bg-input/80 inline-flex h-[20px] w-[34px] shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={cn(
            "bg-element-static-white dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-1px)] data-[state=unchecked]:translate-x-[1px]",
          )}
        />
      </SwitchPrimitive.Root>
      {label && <Label htmlFor={props.id || label}>{label}</Label>}
    </div>
  );
}

export { Switch };
