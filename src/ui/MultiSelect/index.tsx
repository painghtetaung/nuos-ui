import { cn } from "@/utils";
import { ChevronDown, CircleXIcon, X } from "lucide-react";
import * as React from "react";
import { Button } from "@/ui/Button";
import { Chip } from "@/ui/Chip";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  createConfig?: {
    enabled: boolean;
    action: (inputValue: string) => Promise<void>;
    isLoading?: boolean;
  };
  className?: string;
  error?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select",
  disabled = false,
  createConfig,
  className,
  error = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleUnselect = (value: string) => {
    onChange(selected.filter((s) => s !== value));
  };

  const handleSelect = (value: string) => {
    if (!selected.includes(value)) {
      onChange([...selected, value]);
    }
    setInputValue("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleCreate = async () => {
    if (
      inputValue.trim() &&
      !options.find(
        (option) =>
          option.value.toLowerCase() === inputValue.toLowerCase().trim(),
      )
    ) {
      try {
        await createConfig?.action?.(inputValue.trim());
        onChange([...selected, inputValue.trim()]);
        setInputValue("");
        setTimeout(() => inputRef.current?.focus(), 0);
      } catch (error) {
        console.error("Failed to create item:", error);
      }
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const existingOption = options.find(
        (option) =>
          option.label.toLowerCase() === inputValue.toLowerCase().trim(),
      );
      if (existingOption && !selected.includes(existingOption.value)) {
        handleSelect(existingOption.value);
      } else if (createConfig?.enabled) {
        await handleCreate();
      }
    } else if (e.key === "Backspace" && !inputValue && selected.length > 0) {
      e.preventDefault();
      handleUnselect(selected[selected.length - 1]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const filteredOptions = React.useMemo(() => {
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selected.includes(option.value),
    );
  }, [options, inputValue, selected]);

  const canCreate =
    createConfig?.enabled &&
    inputValue.trim() &&
    !options.find(
      (option) =>
        option.value.toLowerCase() === inputValue.toLowerCase().trim(),
    ) &&
    !selected.includes(inputValue.trim());

  const handleInputFocus = () => {
    setOpen(true);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    inputRef.current?.focus();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          ref={containerRef}
          className={cn(
            "border-input-border-primaryDefault text-text-default bg-input-bg-default text-body-sm hover:border-input-border-primaryHover flex min-h-9 w-full cursor-text items-center justify-between gap-1 rounded-lg border px-3 py-1 font-medium focus-within:[box-shadow:var(--ring-position-x,0px)_var(--ring-position-y,0px)_var(--ring-blur,0px)_var(--ring-spread-sm,1px)_var(--color-effect-ring-primary)]",
            error &&
              "border-input-border-destructiveDefault hover:border-input-border-destructiveHover focus-within:[box-shadow:var(--ring-position-x,0px)_var(--ring-position-y,0px)_var(--ring-blur,0px)_var(--ring-spread-sm,2px)_var(--color-effect-ring-destructive)]",
            disabled &&
              "bg-input-bg-inactive hover:border-input-border-primaryDefault text-text-inactive cursor-not-allowed",
            className,
          )}
          onClick={handleContainerClick}
        >
          <div className="flex flex-1 flex-wrap items-center gap-1">
            {selected.map((value) => {
              const option = options.find((opt) => opt.value === value);
              return (
                <Chip
                  key={value}
                  label={option?.label || value}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnselect(value);
                  }}
                  className={cn(
                    disabled && "pointer-events-none cursor-not-allowed",
                  )}
                >
                  <X className="hover:text-destructive ml-1.5 h-3 w-3 cursor-pointer" />
                </Chip>
              );
            })}
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              placeholder={
                selected.length === 0
                  ? createConfig?.enabled
                    ? "Select or create one"
                    : placeholder
                  : ""
              }
              className="placeholder:text-muted-foreground min-w-[8rem] flex-1 bg-transparent outline-none"
              disabled={disabled}
            />
          </div>
          {selected.length > 0 && (
            <CircleXIcon
              className="text-icon-default size-4.5 shrink-0"
              onClick={() => onChange([])}
            />
          )}
          {!createConfig?.enabled && (
            <ChevronDown className="text-icon-default size-4.5 shrink-0" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="shadow-box w-[var(--radix-popover-trigger-width)] border-none bg-white p-2"
        align="start"
      >
        <div className="p-0">
          <div className="max-h-[300px] overflow-y-auto">
            {filteredOptions.length === 0 && !canCreate ? (
              <div className="py-6 text-center text-gray-500">
                {inputValue ? "No results found." : "Start typing to search..."}
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 px-1.5 pt-1.5 pb-0.5">
                {createConfig?.enabled && (
                  <p className="text-text-default pb-0.5 font-semibold">
                    Select or create one
                  </p>
                )}
                {filteredOptions.map((option) => (
                  <Chip
                    label={option.label}
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className="rounded-md"
                  />
                ))}
                {canCreate && (
                  <div
                    onClick={async () => await handleCreate()}
                    className="flex items-center justify-between"
                  >
                    <Chip label={inputValue.trim()} className="rounded-md" />
                    <Button
                      variant="ghost"
                      size="sm"
                      state={createConfig?.isLoading ? "loading" : "default"}
                    >
                      Create new
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
