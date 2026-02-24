"use client";

import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { ChevronDown } from "magick-icons";
import { cn } from "@/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/Popover";
import { Button } from "@/ui/Button";
import { Calendar } from "@/ui/Calendar";
import IconContainer from "@/ui/IconContainer";

interface DatePickerInputProps extends React.ComponentProps<"button"> {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder?: string;
  /**
   * If true, disables all dates before today.
   */
  disablePast?: boolean;
  prefixNode?: React.ReactNode;
  /**
   * If true, shows a clear button when a date is selected.
   */
  withClearButton?: boolean;
}

export function DatePickerInput({
  date,
  setDate,
  placeholder,
  disablePast = false,
  prefixNode,
  withClearButton = false,
  ...props
}: DatePickerInputProps) {
  return (
    <div className="group relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "border-stroke-inverse-slate-03 hover:border-stroke-static-slate-04 focus-visible:border-stroke-static-blue-03 active:border-stroke-static-blue-03 relative z-[2] w-full justify-start rounded-lg border",
              "disabled:bg-button-outline-disabled disabled:text-element-inverse-disabled disabled:border-stroke-inverse-slate-03 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-100",
              "aria-invalid:border-stroke-inverse-red-01 aria-invalid:text-text-destructive aria-invalid:hover:border-stroke-inverse-red-02 aria-invalid:focus-visible:ring-effect-ring-destructive aria-invalid:active:ring-effect-ring-destructive"
            )}
            {...props}
          >
            {prefixNode || <CalendarDays size={20} />}
            <div className="max-w-[15ch] truncate">
              {date ? (
                format(date, "d MMM yyyy")
              ) : (
                <span
                  className={cn(
                    !date &&
                      "text-element-inverse-disabled! text-body-sm leading-body-sm text-left font-medium"
                  )}
                >
                  {placeholder}
                </span>
              )}
            </div>

            <IconContainer className="ml-auto">
              <ChevronDown />
            </IconContainer>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="border-stroke-inverse-slate-02 w-auto rounded-3xl p-0 shadow-md"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            {...(disablePast ? { disabled: { before: new Date() } } : {})}
          />
          {withClearButton && date && (
            <div className="border-t border-stroke-inverse-slate-02 p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setDate(undefined);
                }}
              >
                Clear all
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
