import { XIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/utils";
import { getFileSize } from "@/utils";
import { Button } from "@/ui/Button";
import IconButton from "@/ui/IconButton";
import { ProgressIndicator } from "@/ui/ProgressIndicator";

type FileInputProps = Omit<
  React.ComponentProps<"input">,
  "type" | "onChange"
> & {
  label?: string;
  helperText?: string;
  error?: boolean;
  file?: File | null;
  isPending?: boolean; // Upload pending state from mutation
  onRemove?: () => void;
  onFileChange?: (file: File | null) => void;
  isUploaded?: boolean;
  accept?: string;
  multiple?: boolean;
};

export const FileInput = ({
  label,
  helperText,
  error = false,
  file,
  isPending = false,
  onRemove,
  onFileChange,
  className,
  isUploaded = false,
  disabled,
  accept,
  multiple = false,
  id,
  ...props
}: FileInputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(
    file || null
  );
  const [animatedProgress, setAnimatedProgress] = React.useState(0);
  const animationRef = React.useRef<NodeJS.Timeout | null>(null);

  // Reset animated progress when file changes or is removed
  React.useEffect(() => {
    if (!selectedFile) {
      setAnimatedProgress(0);
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [selectedFile]);

  // Reset state when file prop changes
  React.useEffect(() => {
    if (!file) {
      // Reset all state when file is removed
      setSelectedFile(null);
      setAnimatedProgress(0);
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    // This ensures we always have the latest file reference
    const fileId = `${file.name}-${file.size}-${file.lastModified}`;
    const currentFileId = selectedFile
      ? `${selectedFile.name}-${selectedFile.size}-${selectedFile.lastModified}`
      : null;

    // Only update if it's actually a different file
    if (fileId !== currentFileId) {
      // Reset all state for new file
      setSelectedFile(file);
      setAnimatedProgress(0);
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    } else if (selectedFile !== file) {
      // Same file but different reference - update the reference
      setSelectedFile(file);
    }
  }, [file, selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setSelectedFile(null);
      onFileChange?.(null);
      return;
    }

    const newFile = files[0];
    setSelectedFile(newFile);
    onFileChange?.(newFile);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Clear input first
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // Reset state immediately
    setSelectedFile(null);
    setAnimatedProgress(0);
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }

    // Call onRemove first to remove from parent state immediately
    // This prevents any race conditions
    onRemove?.();
    // Then call onFileChange to sync
    onFileChange?.(null);
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const fileSize = selectedFile ? getFileSize(selectedFile.size) : "";

  // Animate progress when pending
  React.useEffect(() => {
    // Clear any existing animation
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }

    if (isUploaded) {
      setAnimatedProgress(100);
      return;
    }

    if (!isPending) {
      setAnimatedProgress(0);
      return;
    }

    // Animate progress smoothly from 0 to 100% while pending
    const targetProgress = 100;
    const duration = 300; // 0.3 seconds to reach 90%
    const steps = 13; // 13 steps for smooth animation
    const stepDuration = duration / steps;
    const increment = targetProgress / steps;

    setAnimatedProgress(0);

    let currentProgress = 0;
    animationRef.current = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= targetProgress) {
        currentProgress = targetProgress;
        setAnimatedProgress(targetProgress);
        if (animationRef.current) {
          clearInterval(animationRef.current);
          animationRef.current = null;
        }
      } else {
        setAnimatedProgress(currentProgress);
      }
    }, stepDuration);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isPending, isUploaded]);

  const progressPercentage = isUploaded ? 100 : animatedProgress;
  const isUploadingState = isPending && !isUploaded;

  const borderColor = error
    ? "border-stroke-inverse-red-01 hover:border-stroke-inverse-red-02"
    : isUploadingState
      ? "border-stroke-static-blue-03"
      : "border-stroke-inverse-slate-03 hover:border-stroke-static-slate-04";

  const bgColor = selectedFile
    ? "bg-fill-inverse-slate-01"
    : "bg-input-outline-enabled hover:bg-input-outline-hovered";

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-body-sm font-medium",
            disabled
              ? "text-element-inverse-disabled"
              : "text-element-inverse-default"
          )}
        >
          {label}
        </label>
      )}

      {/* File Input Container */}
      <div
        className={cn(
          "group rounded-unit-corner-radius-xl relative flex min-h-10 w-full items-center border transition-[color,box-shadow]",
          borderColor,
          bgColor,
          {
            "pointer-events-none cursor-not-allowed opacity-50": disabled,
            "focus-within:ring-1 focus-within:outline-none": !disabled,
            "focus-within:ring-effect-ring-destructive focus-within:border-stroke-inverse-red-02":
              error && !disabled,
            "focus-within:ring-effect-ring-primary focus-within:border-stroke-static-blue-03":
              !error && !disabled && isUploadingState,
          }
        )}
      >
        <input
          ref={inputRef}
          type="file"
          id={id}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileChange}
          className="hidden"
          {...props}
        />

        {!selectedFile ? (
          /* Empty State - Choose File Button */
          <Button
            type="button"
            onClick={handleChooseFile}
            disabled={disabled}
            variant="outline"
            className={cn(
              "h-full w-full justify-start gap-2 rounded-lg border-0 px-3 py-2 shadow-none",
              error
                ? "border-input-border-destructiveDefault hover:border-input-border-destructiveHover"
                : "border-input-border-primaryDefault hover:border-input-border-primaryHover"
            )}
          >
            <span className="w-[77px] font-semibold">Choose file</span>
            <span className="text-element-inverse-disabled">
              No file chosen
            </span>
          </Button>
        ) : (
          /* File Selected State */
          <div className="gap-x-unit-8px grid w-full grid-cols-4 px-3 py-2">
            <div
              className={cn("gap-x-unit-10px col-span-3 flex items-center", {
                "col-span-2": isUploadingState,
                "cursor-pointer": !disabled,
              })}
              onClick={!disabled ? handleChooseFile : undefined}
              role={!disabled ? "button" : undefined}
              tabIndex={!disabled ? 0 : undefined}
              onKeyDown={
                !disabled
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleChooseFile();
                      }
                    }
                  : undefined
              }
            >
              {/* Choose file button (always visible) */}
              <p className="text-body-sm leading-body-sm text-element-inverse-default font-medium">
                Selected
              </p>

              {/* File name */}
              <span
                className={cn(
                  "text-body-sm leading-body-sm min-w-0 max-w-[18ch] truncate flex-1 font-medium",
                  disabled
                    ? "text-element-inverse-disabled"
                    : "text-element-inverse-default"
                )}
              >
                {selectedFile.name}
              </span>
            </div>
            <div
              className={cn("col-span-1 flex items-center justify-end gap-2", {
                "col-span-2": isUploadingState,
              })}
            >
              {/* File size */}
              <span
                className={cn(
                  "text-body-sm tracking-tight whitespace-nowrap",
                  disabled
                    ? "text-element-inverse-disabled"
                    : "text-element-inverse-gray"
                )}
              >
                {fileSize}
              </span>

              {/* Circular progress indicator */}
              {isUploadingState && (
                <ProgressIndicator
                  variant="circle"
                  value={progressPercentage}
                />
              )}

              {/* Remove button */}
              {!disabled && onRemove && (
                <IconButton
                  varient="ghost"
                  type="button"
                  onClick={handleRemove}
                  aria-label="Remove file"
                  icon={<XIcon className="size-4" />}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helperText && (
        <p
          className={cn(
            "text-body-sm",
            error
              ? "text-element-inverse-red"
              : disabled
                ? "text-element-inverse-disabled"
                : "text-element-inverse-gray"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
