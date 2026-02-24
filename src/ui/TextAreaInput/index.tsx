import * as React from "react";

import { cn } from "@/utils";

const TextareaInput = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & {
    label?: string;
  }
>(({ className, label, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      id={props.id}
      data-slot="textarea"
      className={cn(
        "text-body-sm border-stroke-inverse-slate-03 placeholder:text-body-sm! placeholder:leading-body-sm placeholder:text-text-inactive hover:border-stroke-static-slate-03 bg-input-ghost-enabled focus-visible:border-stroke-static-blue-03  disabled:border-stroke-inverse-slate-02 disabled:bg-fill-inverse-slate-02 rounded-unit-corner-radius-xl flex field-sizing-content min-h-16 w-full border px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none placeholder:font-medium disabled:cursor-not-allowed",
        "aria-invalid:border-stroke-inverse-red-01 aria-invalid:hover:border-stroke-inverse-red-02 aria-invalid:text-element-inverse-red",
        className
      )}
      {...props}
    />
  );
});

TextareaInput.displayName = "TextareaInput";

export default TextareaInput;
