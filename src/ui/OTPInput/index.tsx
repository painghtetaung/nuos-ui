import { cn } from "@/utils";
import {
  OTPInput as BaseOTPInput,
  OTPInputContext as BaseOTPInputContext,
} from "input-otp";
import * as React from "react";

type OTPInputProps = Omit<
  React.ComponentProps<typeof InputOTP>,
  "type" | "render"
> & {
  type?: 4 | 6 | 8;
  separate?: boolean;
  disabled?: boolean;
  className?: string;
};

export function OTPInput({
  type = 4,
  separate = false,
  disabled = false,
  className,
  ...props
}: OTPInputProps) {
  return (
    <div className={cn(className)}>
      <InputOTP disabled={disabled} className="w-full" {...props}>
        <InputOTPGroup className="w-full">
          {[...new Array(type / 2)].map((_, index) => (
            <InputOTPSlot
              className="w-full"
              key={index}
              index={index}
              disabled={disabled}
            />
          ))}
        </InputOTPGroup>
        {separate && <InputOTPSeparator />}
        <InputOTPGroup className="w-full">
          {[...new Array(type / 2)].map((_, index) => (
            <InputOTPSlot
              key={index}
              className="w-full"
              index={index + type / 2}
              disabled={disabled}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof BaseOTPInput> & {
  containerClassName?: string;
}) {
  return (
    <BaseOTPInput
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-1", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  disabled = false,
  placeholder = "0",
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  disabled?: boolean;
  placeholder?: string;
}) {
  const inputOTPContext = React.useContext(BaseOTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "text-text-default data-[active=true]:border-input-border-primaryHover border-input-border-primaryDefault data-[active=true]:ring-effect-ring-primary data-[active=true]:aria-invalid:ring-destructive/20 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive relative flex size-11 items-center justify-center rounded-2xl border font-bold transition-all outline-none data-[active=true]:z-10 data-[active=true]:ring-[2px]",
        className,
        {
          "bg-input-bg-inactive": disabled,
          "text-text-inactive": !char,
        },
      )}
      {...props}
    >
      <span className="text-h6">{char || placeholder}</span>
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <div className="bg-border-primary-normal h-0.5 w-2" />
    </div>
  );
}
