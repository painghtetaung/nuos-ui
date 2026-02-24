import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils";

const alertVariants = cva(
  "relative w-full rounded-lg p-3  grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        secondary: "bg-noticeBox-bg-secondary",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface AlertProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

function Alert({
  className,
  variant,
  title,
  description,
  icon,
  ...props
}: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className, "")}
      {...props}
    >
      {icon}
      <div className="flex flex-col items-start gap-1">
        {title && <BaseAlertTitle>{title}</BaseAlertTitle>}
        {description && (
          <BaseAlertDescription>{description}</BaseAlertDescription>
        )}
      </div>
    </div>
  );
}

function BaseAlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "leading-title-sm tracking-0 text-title-sm col-start-2 line-clamp-1 min-h-4 font-bold",
        className,
      )}
      {...props}
    />
  );
}

function BaseAlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-element-inverse-default tracking-0 leading-caption text-body-sm col-start-2 grid justify-items-start gap-1 font-medium [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, BaseAlertDescription, BaseAlertTitle };
