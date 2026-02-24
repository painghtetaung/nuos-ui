import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/utils";

type SelectRootProps = React.ComponentProps<typeof SelectPrimitive.Root> &
  Omit<React.HTMLAttributes<HTMLSelectElement>, "onChange">;

interface Props extends SelectRootProps {
  defaultValue: string | undefined;
  options: readonly {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  onChange?: (value: string | undefined) => void;
  variant?: "outline" | "ghost";
  placeholder?: string;
  className?: string;
  withArrow?: boolean;
  contentProps?: React.ComponentProps<typeof SelectPrimitive.Content>;
  itemProps?: Omit<React.ComponentProps<typeof SelectPrimitive.Item>, "value">;
}

function SelectInput({
  defaultValue,
  options,
  variant = "outline",
  onChange,
  placeholder,
  className,
  withArrow = true,
  contentProps,
  itemProps,
  ...props
}: Props) {
  return (
    <BaseSelect onValueChange={onChange} defaultValue={defaultValue} {...props}>
      <BaseSelectTrigger
        withArrow={withArrow}
        id={props.id}
        aria-invalid={props["aria-invalid"]}
        className={cn("w-full cursor-pointer", className)}
        variant={variant}
      >
        <BaseSelectValue
          className="flex-1"
          placeholder={placeholder || "Select"}
        />
      </BaseSelectTrigger>
      <BaseSelectContent
        {...contentProps}
        className={cn(
          "border-stroke-inverse-slate-02 border",
          contentProps?.className
        )}
      >
        {options.map((option) => (
          <BaseSelectItem
            key={option.value}
            value={option.value}
            className={cn(itemProps?.className)}
            {...itemProps}
          >
            {option.icon}
            {option.label}
          </BaseSelectItem>
        ))}
      </BaseSelectContent>
    </BaseSelect>
  );
}

function BaseSelect({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function BaseSelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function BaseSelectTrigger({
  className,
  withArrow = true,
  size = "default",
  variant = "outline",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
  variant?: "outline" | "ghost";
  withArrow?: boolean;
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "focus-visible:border-stroke-inverse-blue-02 focus-visible:bg-navigation-selected active:bg-navigation-selected active:border-stroke-inverse-blue-02 hover:bg-navigation-hovered cursor-pointer border border-transparent transition-all duration-300 active:border",
        "aria-invalid:border-stroke-inverse-red-01 aria-invalid:hover:border-stroke-inverse-red-02 aria-invalid:text-element-inverse-red!",
        {
          "bg-input-outline-enabled hover:bg-input-outline-hovered disabled:bg-input-outline-disabled border-stroke-inverse-slate-03 hover:border-stroke-inverse-slate-04 focus-within:border-stroke-inverse-slate-04 border":
            variant === "outline",

          /* Invalid */

          /* Outline On Focus */
          "focus-visible:hover:border-stroke-static-blue-03 focus-visible:border-stroke-static-blue-03 focus-within:outline-none":
            variant === "outline",

          "bg-input-ghost-enabled hover:bg-input-ghost-hovered disabled:bg-input-ghost-disabled":
            variant === "ghost",
        },

        "data-[placeholder]:text-element-inverse-disabled [&_svg:not([class*='text-'])]:text-element-inverse-disabled focus-visible:aria-invalid:border-input-border-destructiveHover    text-body-sm rounded-unit-corner-radius-xl flex w-fit items-center justify-between gap-2 bg-transparent px-3 py-2 whitespace-nowrap transition-[color,box-shadow] outline-none disabled:cursor-not-allowed data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      {withArrow && (
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon className="text-icon-default size-4" />
        </SelectPrimitive.Icon>
      )}
    </SelectPrimitive.Trigger>
  );
}

function BaseSelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "glass-effect data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-unit-corner-radius-3xl relative z-[var(--z-popover)] max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto px-1 py-1 shadow-xs",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <BaseSelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <BaseSelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

// function BaseSelectLabel({
//   className,
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.Label>) {
//   return (
//     <SelectPrimitive.Label
//       data-slot="select-label"
//       className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
//       {...props}
//     />
//   );
// }

function BaseSelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "hover:bg-button-soft-hovered [&_svg:not([class*='text-'])]:text-text-inactive relative flex w-full cursor-pointer items-center gap-2 rounded-lg py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="text-icon-secondary size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

// function BaseSelectSeparator({
//   className,
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
//   return (
//     <SelectPrimitive.Separator
//       data-slot="select-separator"
//       className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
//       {...props}
//     />
//   );
// }

function BaseSelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function BaseSelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  // BaseSelectContent,
  // BaseSelectGroup,
  // BaseSelectItem,
  // BaseSelectLabel,
  // BaseSelectScrollDownButton,
  // BaseSelectScrollUpButton,
  // BaseSelectSeparator,
  // BaseSelectTrigger,
  // BaseSelectValue,
  SelectInput,
};
