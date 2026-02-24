import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils";

const progressIndicatorVariants = cva(
  "transition-all duration-300 ease-in-out p-unit-2px",
  {
    variants: {
      variant: {
        bar: "relative w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 h-4",
        circle: "relative inline-flex items-center justify-center w-16 h-16",
      },
    },
    defaultVariants: {
      variant: "bar",
    },
  }
);

const progressFillVariants = cva(
  "transition-all duration-300 ease-in-out bg-blue-500",
  {
    variants: {
      variant: {
        bar: "h-full rounded-full",
        circle: "stroke-current stroke-linecap-round",
      },
    },
    defaultVariants: {
      variant: "bar",
    },
  }
);

export interface ProgressIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressIndicatorVariants> {
  value: number;
  max?: number;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressIndicator({
  value,
  max = 100,
  showPercentage = true,
  className,
  variant,
  ...props
}: ProgressIndicatorProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  if (variant === "circle") {
    const radius = 40; // Base radius for calculations
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex h-5 w-[75px] items-center justify-start">
        <div
          className={cn(progressIndicatorVariants({ variant }), className)}
          {...props}
        >
          <svg
            className="h-5 w-5 -rotate-90 transform"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth={20}
              className="text-element-inverse-disabled"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth={20}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={cn(
                progressFillVariants({ variant }),
                "text-element-static-blue"
              )}
            />
          </svg>
        </div>

        {/* Percentage text to the right */}
        {showPercentage && (
          <span className="text-caption text-element-inverse-gray w-[50px] font-semibold">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }

  // Bar variant
  return (
    <div className="w-full">
      {/* Progress bar container */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            progressIndicatorVariants({ variant }),
            "flex-1",
            className
          )}
          {...props}
        >
          <div
            className={cn(progressFillVariants({ variant }), className)}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Percentage text to the right */}
        {showPercentage && (
          <span className="text-caption text-element-inverse-gray font-semibold">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
}
