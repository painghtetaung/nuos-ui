import * as React from "react";

import { cn } from "@/utils";
import { Eye, EyeOff } from "lucide-react";

type Props = React.ComponentProps<"input"> & {
  label?: string;
};

export const PasswordInput = React.memo(
  ({ type, label, className, ...props }: Props) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const error = props["aria-invalid"] || false;
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
      <div
        className={cn(
          "group relative flex items-center gap-2",
          "min-w-0 rounded-lg border transition-[color,box-shadow]",
          {
            /* Default State */
            "hover:border-input-border-primaryHover border-input-border-primaryDefault":
              !error,

            /* Default On Focus */
            "focus-within:ring-effect-ring-primary focus-within:border-input-border-primaryHover focus-within:ring-2 focus-within:outline-none":
              !error,

            /* Error State  */
            "border-input-border-destructiveDefault hover:border-input-border-destructiveHover text-text-destructive":
              error && !props.disabled,

            /* Error On Focus */
            "focus-within:border-input-border-destructiveHover focus-within:ring-effect-ring-destructive text-text-destructive focus-within:ring-2":
              error,

            /* Disable State */
            "bg-input-bg-inactive text-text-inactive border-input-border-primaryDefault pointer-events-none cursor-not-allowed":
              props.disabled,
          },
        )}
      >
        <input
          ref={inputRef}
          id={props.id + (label || "")}
          type={showPassword ? "text" : "password"}
          data-slot="input"
          className={cn(
            "leading-body-sm text-text-default md:text-body-sm flex h-full w-full rounded-lg bg-transparent py-2 pr-10 pl-3 text-sm font-medium outline-none",
            "selection:bg-primary selection:text-primary-foreground",
            "placeholder:text-body-sm placeholder:leading-body-sm placeholder:text-text-inactive placeholder:font-medium",
            {
              "text-text-destructive": error,
            },
            className,
          )}
          {...props}
          value={props.value}
          onBlur={(e) => {
            if (props.disabled) return;
            props.onBlur?.(e);
          }}
        />
        <button
          tabIndex={-1}
          data-slot="show-password"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="hover:bg-primary-bg-soft absolute right-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm bg-white"
        >
          {showPassword ? (
            <Eye size={16} className="text-element-inverse-default-alt" />
          ) : (
            <EyeOff size={16} className="text-element-inverse-default-alt" />
          )}
        </button>
      </div>
    );
  },
);
