import { CheckCheck, Copy, X } from "lucide-react";
import * as React from "react";
import { cn } from "../utils";

type Props = React.ComponentProps<"input"> & {
  label?: string;
  error?: boolean;
  variant?: "ghost" | "outline";
  inlineItemsNode?: React.ReactNode;
  prefixNode?: {
    node: React.ReactNode;
    withBorder?: boolean;
    className?: string;
  };
  suffixNode?: {
    node: React.ReactNode;
    withBorder?: boolean;
    className?: string;
  };
  includeCopy?: boolean;
  includeClear?: boolean;
  inputClassName?: string;
};

export const Input = ({
  className,
  type = "text",
  label,
  variant = "outline",
  prefixNode,
  suffixNode,
  inlineItemsNode,
  includeCopy = false,
  includeClear = false,
  inputClassName,
  ...props
}: Props) => {
  const [showCopy, setShowCopy] = React.useState(false);
  const [onFocus, setOnFocus] = React.useState(false);
  const [showClear, setShowClear] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const error = props["aria-invalid"] || false;

  function handleClear(e: React.MouseEvent) {
    e.preventDefault();
    props.onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  }

  const mutatedProps: React.ComponentProps<"input"> = {
    ...props,
    onBlur: (e) => {
      if (props.disabled) return;
      props.onBlur && props.onBlur(e);
      setOnFocus(false);
    },
  };

  return (
    <div
      onMouseEnter={() => {
        if (props.disabled) return;
        setShowClear(true);
        if (!onFocus) {
          setShowCopy(true);
        }
      }}
      onMouseLeave={() => {
        if (props.disabled) return;
        setShowClear(false);
        setShowCopy(false);
      }}
      className={cn(
        "group text-element-inverse-default placeholder:text-element-inverse-disabled relative flex min-h-10 w-full items-center",
        "rounded-unit-corner-radius-xl min-w-0 border transition-[color,box-shadow]",
        {
          /* Outline State */
          "hover:border-stroke-static-slate-04 border-stroke-inverse-slate-03 bg-input-outline-enabled hover:bg-input-outline-hovered":
            variant === "outline" && !error,

          /* Outline On Focus */
          "focus-within:hover:border-stroke-static-blue-03 focus-within:border-stroke-static-blue-03 focus-within:ring-0 focus-within:outline-none":
            variant === "outline" && !error,

          /* Ghost State */
          "hover:bg-input-ghost-hovered bg-input-ghost-enabled border-transparent":
            variant === "ghost" && !error,

          /* Error State  */
          "border-stroke-inverse-red-01 hover:border-stroke-inverse-red-02 text-element-inverse-red":
            error && !props.disabled,

          /* Error On Focus */
          // "focus-within:border-input-border-destructiveHover focus-within:ring-effect-ring-destructive text-text-destructive focus-within:ring-2":
          error,

          /* Disable State */
          "text-element-inverse-disabled pointer-events-none cursor-not-allowed":
            props.disabled,

          "bg-input-outline-disabled border-stroke-inverse-slate-03":
            props.disabled && variant === "outline",
          "bg-input-ghost-disabled": props.disabled && variant === "ghost",
        },
        className
      )}
    >
      {type === "url" && (
        <div className="border-border-primary-light flex h-full items-center justify-center border-r px-3">
          <p className="text-body-sm leading-body-sm text-text-inactive font-medium">
            https://
          </p>
        </div>
      )}

      {prefixNode && (
        <div
          className={cn(
            {
              "border-border-primary-light hover:bg-surface-bg flex h-full cursor-pointer items-center justify-center overflow-x-auto rounded-l-lg border-r":
                prefixNode.withBorder,
              "pl-3": !prefixNode.withBorder && !inlineItemsNode,
            },
            prefixNode.className
          )}
        >
          {prefixNode.node}
        </div>
      )}

      <div
        className={cn("relative h-full w-full", {
          "flex flex-wrap items-center": inlineItemsNode,
        })}
      >
        {inlineItemsNode}
        <input
          ref={inputRef}
          type={type}
          id={props.id + (label || "")}
          onFocus={() => {
            if (props.disabled) return;
            setOnFocus(true);
            setShowCopy(false);
          }}
          data-slot="input"
          className={cn(
            "peer leading-body-sm text-medium text-body-sm flex h-full w-full appearance-none rounded-lg bg-transparent px-2.5 py-1.5 font-medium outline-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
            "selection:bg-primary-bg-light selection:text-text-default",
            "placeholder:text-body-sm placeholder:leading-body-sm placeholder:text-text-inactive placeholder:font-medium",
            inputClassName,

            {
              "rounded-l-none pl-2": prefixNode,
              "rounded-r-none pr-2": suffixNode,
              "text-text-secondary": type === "email",
              "text-text-destructive": error,
              "mx-1 inline-block h-auto w-full rounded-lg": inlineItemsNode,
            }
          )}
          {...mutatedProps}
          value={props.value}
        />
        {props.value && (
          <div className="absolute top-0 right-2 flex h-full items-center gap-2 peer-disabled:hidden">
            {includeCopy && (
              <button
                tabIndex={-1}
                data-showcopy={showCopy}
                className="hover:bg-primary-bg-soft flex h-[20px] w-[20px] items-center justify-center rounded-sm bg-white opacity-0 transition-opacity duration-200 data-[showCopy=true]:opacity-100"
              >
                <CopyIcon value={props.value as string} />
              </button>
            )}

            {includeClear && (
              <button
                tabIndex={-1}
                data-showclear={showClear}
                className="hover:bg-primary-bg-soft flex h-[20px] w-[20px] items-center justify-center rounded-sm bg-white opacity-0 transition-opacity duration-200 data-[showClear=true]:opacity-100"
              >
                <X
                  onClick={(e) => {
                    handleClear(e);
                  }}
                  className="cursor-pointer"
                  size={18}
                />
              </button>
            )}
          </div>
        )}
      </div>

      {suffixNode && (
        <div
          className={cn(
            {
              "border-border-primary-light hover:bg-surface-bg flex h-full cursor-pointer items-center justify-center rounded-r-lg border-l":
                suffixNode.withBorder,
              "pr-3": !suffixNode.withBorder,
            },
            suffixNode.className
          )}
        >
          {suffixNode.node}
        </div>
      )}
    </div>
  );
};

function CopyIcon({ value }: { value: string }) {
  const [isCopy, setIsCopy] = React.useState(false);

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    try {
      navigator.clipboard.writeText(value as string);
      setIsCopy(true);

      setTimeout(() => {
        setIsCopy(false);
      }, 1200);
    } catch (error) {
      setIsCopy(false);
      console.error(error);
    }
  }

  return (
    <>
      {!isCopy ? (
        <Copy className="cursor-pointer" onClick={handleCopy} size={18} />
      ) : (
        <CheckCheck className="cursor-pointer" size={18} />
      )}
    </>
  );
}
