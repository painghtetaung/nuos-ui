"use client";

import { cn } from "@/utils";
import { Clock } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/Dropdown";
import { Input } from "@/ui/Input";
import { Label } from "@/ui/Label";

interface TimePickerProps
  extends Omit<React.ComponentProps<"input">, "onChange"> {
  label?: string;
  timeOptions: { label: string; value: string }[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function TimePicker({
  label,
  onValueChange,
  timeOptions,
  defaultValue,
  value,
  ...props
}: TimePickerProps) {
  
  const [isOpen, setIsOpen] = useState(false);
  const currentValue = value || defaultValue || "";

  const formatTimeForDisplay = (timeValue: string): string => {
    if (!timeValue) return "";

    const timeOption = timeOptions?.find(
      (option) => option.value === timeValue,
    );
    return timeOption ? timeOption.label : timeValue;
  };

  const handleChange = (value: string) => {
    onValueChange?.(value);
  };
  return (
    <div className="flex flex-col gap-3">
      {label && (
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
      )}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger className="!p-0">
          <Input
            {...props}
            className="py-[1.4px]"
            value={currentValue ? formatTimeForDisplay(currentValue) : ""}
            onKeyDown={(e) => e.preventDefault()}
            prefixNode={{
              node: (
                <Clock className="pointer-events-none h-5 w-5 text-gray-700" />
              ),
              withBorder: false,
            }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="max-h-60 min-w-41 overflow-y-auto"
        >
          {timeOptions?.map((item) => (
            <DropdownMenuItem
              key={item.value}
              className={cn(
                "text-body-sm",
                currentValue === item.value && "bg-dropdown-bg-hover font-bold",
              )}
              onClick={() => handleChange(item.value)}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
