"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/Popover";
import { cn } from "@/utils";
import { Check } from "lucide-react";
import * as React from "react";
import { Button } from "@/ui/Button";

interface SelectHoverProps {
  options: { label: string | React.ReactNode; value: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SelectHover({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  className,
}: SelectHoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <PopoverTrigger asChild>
          <Button role="combobox" aria-expanded={isOpen} className={className}>
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="bg-surface-bg-container w-full rounded-3xl border-none p-2 shadow-md"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex max-h-[300px] flex-col items-start gap-[2px] overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                className={cn(
                  "hover:bg-dropdown-bg-hover text-body-sm relative flex w-full cursor-pointer items-center rounded-lg p-[6px] outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  value === option.value && "bg-dropdown-bg-hover",
                )}
                onClick={() => handleSelect(option.value)}
              >
                <span className="flex-1">{option.label}</span>
                {value === option.value && (
                  <Check className="text-icon-secondary ml-2 h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </div>
    </Popover>
  );
}
