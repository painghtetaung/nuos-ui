import { useRef } from "react";

import { ToggleDropdownLeftButton } from "./ToggleDropdownLeftButton";
import { ToggleDropdownRightButton } from "./ToggleDropdownRightButton";
import { useToggleDropdown } from "./useToggleDropdown";

type ToggleDropdownButtonProps = {
  type: "text" | "icon";
  selected: boolean;
  variant: "primary" | "secondary" | "destructive";
  leftButtonChildren?: React.ReactNode;
  rightButtonChildren?: React.ReactNode;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  dropdownMenu?: React.ReactNode;
};

const ToggleDropdownButton = ({
  type,
  selected,
  variant,
  leftButtonChildren,
  rightButtonChildren,
  onRightButtonClick,
  onLeftButtonClick,
  dropdownMenu,
}: ToggleDropdownButtonProps) => {
  const rightButtonRef = useRef<HTMLButtonElement>(null);

  const handleRightButtonClick = () => {
    onRightButtonClick?.();
  };

  const handleLeftButtonClick = () => {
    onLeftButtonClick?.();
  };

  return (
    <div className="gap-x-unit-1px flex items-center">
      <ToggleDropdownLeftButton
        selected={selected}
        variant={variant}
        size="md"
        type={type}
        onClick={handleLeftButtonClick}
      >
        {leftButtonChildren}
      </ToggleDropdownLeftButton>

      <div className="relative">
        <ToggleDropdownRightButton
          ref={rightButtonRef}
          selected={selected}
          variant={variant}
          size="md"
          type={type}
          onClick={handleRightButtonClick}
        >
          {rightButtonChildren}
        </ToggleDropdownRightButton>

        {dropdownMenu}
      </div>
    </div>
  );
};

export default ToggleDropdownButton;
export { useToggleDropdown };
