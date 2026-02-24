import { cn } from "@/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/ui/Dropdown";

type ToolToggleProps = {
  className?: string;
  dropdown?: boolean;
  dropdownContent?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (active: boolean) => void;
};

const ToolToggle = ({
  dropdown,
  dropdownContent,
  icon,
  className,
  onClick,
}: ToolToggleProps) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    onClick?.(active);
  };

  return (
    <div className={cn(dropdown ? "min-w-20" : "min-w-[52px]", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "border-border-primary-light !bg-toggle-bg-inactiveDefault hover:!bg-toggle-bg-inactiveHover flex h-full w-full items-center justify-center gap-x-2 !rounded-full border p-4 transition-all",
            active &&
              "!bg-toggle-bg-activeDefault hover:!bg-toggle-bg-activeHover",
          )}
        >
          <div
            className="flex items-center justify-center gap-x-2"
            onClick={handleClick}
          >
            {icon}
            {dropdown && <ChevronDown className="text-icon-default size-5" />}
          </div>
        </DropdownMenuTrigger>
        {dropdown && (
          <DropdownMenuContent align="start" className="min-w-41">
            {dropdownContent}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
};

export { ToolToggle };
