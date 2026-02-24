import { cn } from "@/utils";
import { type ReactNode, useState } from "react";
import { Button } from "@/ui/Button";
import {
  BaseDialog,
  BaseDialogContent,
  BaseDialogFooter,
  BaseDialogOverlay,
} from "@/ui/OldDialog/BaseDialog";

// Action button configuration interface
export interface DialogAction {
  label: string;
  onClick: () => void | Promise<void>;
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "ai-filled"
    | "ai-outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

// Dialog base styles
const dialogBaseStyles =
  "p-0 fixed bg-fill-foreground w-full border-stroke-inverse-slate-02 rounded-unit-corner-radius-5xl max-h-[80vh] overflow-auto max-w-xl ";

// Main Dialog component props
export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
  showCloseButton?: boolean;
  restrictAccess?: boolean;

  // Action button configurations
  primaryAction?: DialogAction;
  secondaryAction?: DialogAction;
  tertiaryAction?: DialogAction;

  // Footer configuration
  footerClassName?: string;
  hideFooter?: boolean;
  footer?: ReactNode;
}

const Dialog = ({
  open,
  onOpenChange,
  children,
  className,
  restrictAccess = false,
  showCloseButton = false,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  footerClassName,
  footer,
  hideFooter = false,
}: DialogProps) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleAction = async (action: DialogAction, actionKey: string) => {
    if (action.loading || loadingStates[actionKey]) return;

    setLoadingStates((prev) => ({ ...prev, [actionKey]: true }));

    try {
      await action.onClick();
    } finally {
      setLoadingStates((prev) => ({ ...prev, [actionKey]: false }));
    }
  };

  const renderActionButton = (action: DialogAction, actionKey: string) => (
    <Button
      key={actionKey}
      variant={action.variant || "primary"}
      size={action.size || "md"}
      disabled={action.disabled || loadingStates[actionKey]}
      state={loadingStates[actionKey] ? "loading" : "default"}
      className={cn("w-full", action.className)}
      prefix={action.prefix}
      suffix={action.suffix}
      onClick={() => handleAction(action, actionKey)}
    >
      {action.label}
    </Button>
  );

  const renderDialogFooter = () => {
    // Actions are ordered by priority: primary (highest) -> secondary -> tertiary (lowest)
    const actions = [
      primaryAction ? { action: primaryAction, key: "primary" as const } : null,
      secondaryAction
        ? { action: secondaryAction, key: "secondary" as const }
        : null,
      tertiaryAction
        ? { action: tertiaryAction, key: "tertiary" as const }
        : null,
    ].filter(
      (
        item
      ): item is {
        action: DialogAction;
        key: "primary" | "secondary" | "tertiary";
      } => item !== null
    );

    if (actions.length === 0) return null;

    // Design system specific layouts
    const getFooterLayout = () => {
      if (actions.length === 1) {
        // Single button - centered
        return "flex justify-center";
      } else if (actions.length === 2) {
        // Two buttons - side by side with Cancel on left, Confirm on right
        return "grid grid-cols-2 gap-2";
      } else if (actions.length === 3) {
        // Three buttons - stacked vertically
        return "flex !flex-col gap-2";
      }
      return "flex justify-center";
    };

    return (
      <BaseDialogFooter className={cn(getFooterLayout(), footerClassName)}>
        {/* Render actions in priority order: primary first, then secondary, then tertiary */}
        {actions.map(({ action, key }) => renderActionButton(action, key))}
      </BaseDialogFooter>
    );
  };

  return (
    <BaseDialog open={open} onOpenChange={onOpenChange} modal={true}>
      <BaseDialogOverlay
        className={cn(
          restrictAccess && "backdrop-blur-sm bg-opacity-static-07"
        )}
      />
      <BaseDialogContent
        className={cn(dialogBaseStyles, className)}
        showCloseButton={showCloseButton}
      >
        {children && <>{children}</>}

        {!hideFooter && (
          <div className="bg-fill-inverse-slate-03 border-stroke-inverse-slate-02 border-t p-4">
            {footer ? footer : renderDialogFooter()}
          </div>
        )}
      </BaseDialogContent>
    </BaseDialog>
  );
};

export default Dialog;
