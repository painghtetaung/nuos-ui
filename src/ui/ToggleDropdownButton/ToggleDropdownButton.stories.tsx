import type { Meta, StoryObj } from "@storybook/react";
import {
  ChevronDown,
  Copy,
  MoreVertical,
  Pen,
  Settings,
  Trash2,
} from "lucide-react";
import { ChevronDown as MagickChevronDown } from "magick-icons";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/Dropdown";
import ToggleDropdownButton, { useToggleDropdown } from "./index";
import { ToggleDropdownLeftButton } from "./ToggleDropdownLeftButton";
import { ToggleDropdownRightButton } from "./ToggleDropdownRightButton";

const meta: Meta<typeof ToggleDropdownButton> = {
  title: "Common/ToggleDropdownButton",
  component: ToggleDropdownButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toggle button component with a dropdown menu. Consists of a left button (main action) and a right button (dropdown trigger) that can display a menu of options.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "icon"],
      description: "Display type - text or icon",
    },
    selected: {
      control: "boolean",
      description: "Whether the button is in selected state",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive"],
      description: "Visual style variant",
    },
    leftButtonChildren: {
      control: "text",
      description: "Content for the left button",
    },
    rightButtonChildren: {
      control: "object",
      description: "Content for the right button (usually an icon)",
    },
    onLeftButtonClick: {
      action: "leftButtonClicked",
      description: "Callback when left button is clicked",
    },
    onRightButtonClick: {
      action: "rightButtonClicked",
      description: "Callback when right button is clicked",
    },
    dropdownMenu: {
      control: "object",
      description: "Dropdown menu component to be rendered",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleDropdownButton>;

// Default story
export const Default: Story = {
  render: (args) => {
    const dropdownControl = useToggleDropdown();
    const menuItems = [
      {
        value: "edit",
        label: "Edit",
        onClick: () => {
          console.log("Edit clicked");
          dropdownControl.closeDropdown();
        },
      },
      {
        value: "delete",
        label: "Delete",
        onClick: () => {
          console.log("Delete clicked");
          dropdownControl.closeDropdown();
        },
      },
    ];

    return (
      <ToggleDropdownButton
        {...args}
        onRightButtonClick={() => dropdownControl.openDropdown()}
        dropdownMenu={
          <DropdownMenu
            open={dropdownControl.isOpen}
            onOpenChange={dropdownControl.setIsOpen}
          >
            <DropdownMenuTrigger asChild>
              <button
                className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-0"
                aria-hidden="true"
                tabIndex={-1}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="glass-effect border-stroke-inverse-slate-01 rounded-unit-corner-radius-3xl min-w-[100px] border"
              align="end"
              sideOffset={4}
              onEscapeKeyDown={dropdownControl.closeDropdown}
              onInteractOutside={dropdownControl.closeDropdown}
            >
              <DropdownMenuGroup>
                {menuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    className="hover:bg-dropdown-bg-hover cursor-pointer"
                    onSelect={() => {
                      item.onClick();
                    }}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
    );
  },
  args: {
    type: "text",
    selected: false,
    variant: "primary",
    leftButtonChildren: "Hello",
    rightButtonChildren: <ChevronDown />,
  },
};

// Text type with selected state
export const Selected: Story = {
  render: (args) => {
    const dropdownControl = useToggleDropdown();
    const menuItems = [
      {
        value: "edit",
        label: "Edit",
        onClick: () => {
          console.log("Edit clicked");
          dropdownControl.closeDropdown();
        },
      },
    ];

    return (
      <ToggleDropdownButton
        {...args}
        onRightButtonClick={() => dropdownControl.openDropdown()}
        dropdownMenu={
          <DropdownMenu
            open={dropdownControl.isOpen}
            onOpenChange={dropdownControl.setIsOpen}
          >
            <DropdownMenuTrigger asChild>
              <button
                className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-0"
                aria-hidden="true"
                tabIndex={-1}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="glass-effect border-stroke-inverse-slate-01 rounded-unit-corner-radius-3xl min-w-[100px] border"
              align="end"
              sideOffset={4}
              onEscapeKeyDown={dropdownControl.closeDropdown}
              onInteractOutside={dropdownControl.closeDropdown}
            >
              <DropdownMenuGroup>
                {menuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    className="hover:bg-dropdown-bg-hover cursor-pointer"
                    onSelect={() => {
                      item.onClick();
                    }}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
    );
  },
  args: {
    type: "text",
    selected: true,
    variant: "primary",
    leftButtonChildren: "Selected",
    rightButtonChildren: <ChevronDown />,
  },
};

// Icon type
export const IconType: Story = {
  render: (args) => {
    const dropdownControl = useToggleDropdown();
    const menuItems = [
      {
        value: "settings",
        label: "Settings",
        onClick: () => {
          console.log("Settings clicked");
          dropdownControl.closeDropdown();
        },
      },
      {
        value: "preferences",
        label: "Preferences",
        onClick: () => {
          console.log("Preferences clicked");
          dropdownControl.closeDropdown();
        },
      },
    ];

    return (
      <ToggleDropdownButton
        {...args}
        onRightButtonClick={() => dropdownControl.openDropdown()}
        dropdownMenu={
          <DropdownMenu
            open={dropdownControl.isOpen}
            onOpenChange={dropdownControl.setIsOpen}
          >
            <DropdownMenuTrigger asChild>
              <button
                className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-0"
                aria-hidden="true"
                tabIndex={-1}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="glass-effect border-stroke-inverse-slate-01 rounded-unit-corner-radius-3xl min-w-[100px] border"
              align="end"
              sideOffset={4}
              onEscapeKeyDown={dropdownControl.closeDropdown}
              onInteractOutside={dropdownControl.closeDropdown}
            >
              <DropdownMenuGroup>
                {menuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    className="hover:bg-dropdown-bg-hover cursor-pointer"
                    onSelect={() => {
                      item.onClick();
                    }}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
    );
  },
  args: {
    type: "icon",
    selected: false,
    variant: "primary",
    leftButtonChildren: <Settings />,
    rightButtonChildren: <MoreVertical />,
  },
};

// All variants
export const AllVariants: Story = {
  render: () => {
    const primaryControl = useToggleDropdown();
    const secondaryControl = useToggleDropdown();
    const destructiveControl = useToggleDropdown();

    const createDropdownMenu = (
      control: ReturnType<typeof useToggleDropdown>,
    ) => (
      <DropdownMenu open={control.isOpen} onOpenChange={control.setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-0"
            aria-hidden="true"
            tabIndex={-1}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="glass-effect border-stroke-inverse-slate-01 rounded-unit-corner-radius-3xl min-w-[100px] border"
          align="end"
          sideOffset={4}
          onEscapeKeyDown={control.closeDropdown}
          onInteractOutside={control.closeDropdown}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="hover:bg-dropdown-bg-hover cursor-pointer"
              onSelect={() => {
                console.log("Option 1");
                control.closeDropdown();
              }}
            >
              Option 1
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    return (
      <div className="flex flex-col gap-4">
        <ToggleDropdownButton
          type="text"
          selected={false}
          variant="primary"
          leftButtonChildren="Primary"
          rightButtonChildren={<ChevronDown />}
          onRightButtonClick={() => primaryControl.openDropdown()}
          dropdownMenu={createDropdownMenu(primaryControl)}
        />
        <ToggleDropdownButton
          type="text"
          selected={false}
          variant="secondary"
          leftButtonChildren="Secondary"
          rightButtonChildren={<ChevronDown />}
          onRightButtonClick={() => secondaryControl.openDropdown()}
          dropdownMenu={createDropdownMenu(secondaryControl)}
        />
        <ToggleDropdownButton
          type="text"
          selected={false}
          variant="destructive"
          leftButtonChildren="Destructive"
          rightButtonChildren={<ChevronDown />}
          onRightButtonClick={() => destructiveControl.openDropdown()}
          dropdownMenu={createDropdownMenu(destructiveControl)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available variants of the ToggleDropdownButton.",
      },
    },
  },
};

// With multiple menu items
export const MultipleMenuItems: Story = {
  render: (args) => {
    const dropdownControl = useToggleDropdown();
    const menuItems = [
      {
        value: "edit",
        label: (
          <div className="flex items-center gap-2">
            <Pen className="size-4" /> Edit
          </div>
        ),
        onClick: () => {
          console.log("Edit clicked");
          dropdownControl.closeDropdown();
        },
      },
      {
        value: "copy",
        label: (
          <div className="flex items-center gap-2">
            <Copy className="size-4" /> Copy
          </div>
        ),
        onClick: () => {
          console.log("Copy clicked");
          dropdownControl.closeDropdown();
        },
      },
      {
        value: "delete",
        label: (
          <div className="flex items-center gap-2">
            <Trash2 className="size-4" /> Delete
          </div>
        ),
        onClick: () => {
          console.log("Delete clicked");
          dropdownControl.closeDropdown();
        },
      },
    ];

    return (
      <ToggleDropdownButton
        {...args}
        onRightButtonClick={() => dropdownControl.openDropdown()}
        dropdownMenu={
          <DropdownMenu
            open={dropdownControl.isOpen}
            onOpenChange={dropdownControl.setIsOpen}
          >
            <DropdownMenuTrigger asChild>
              <button
                className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-0"
                aria-hidden="true"
                tabIndex={-1}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="glass-effect border-stroke-inverse-slate-01 rounded-unit-corner-radius-3xl min-w-[100px] border"
              align="end"
              sideOffset={4}
              onEscapeKeyDown={dropdownControl.closeDropdown}
              onInteractOutside={dropdownControl.closeDropdown}
            >
              <DropdownMenuGroup>
                {menuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    className="hover:bg-dropdown-bg-hover cursor-pointer"
                    onSelect={() => {
                      item.onClick();
                    }}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
    );
  },
  args: {
    type: "text",
    selected: false,
    variant: "primary",
    leftButtonChildren: "Actions",
    rightButtonChildren: <ChevronDown />,
  },
  parameters: {
    docs: {
      description: {
        story: "Dropdown with multiple menu items including icons.",
      },
    },
  },
};

// With external hook control
export const WithHookControl: Story = {
  render: () => {
    const dropdownControl = useToggleDropdown();
    const [action, setAction] = useState<string>("No action");

    const menuItems = [
      {
        value: "action1",
        label: "Action 1",
        onClick: () => {
          setAction("Action 1 clicked");
          dropdownControl.closeDropdown();
        },
      },
      {
        value: "action2",
        label: "Action 2",
        onClick: () => {
          setAction("Action 2 clicked");
          dropdownControl.closeDropdown();
        },
      },
    ];

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => dropdownControl.openDropdown()}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Open Dropdown Programmatically
          </button>
          <button
            onClick={() => dropdownControl.closeDropdown()}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Close Dropdown
          </button>
        </div>
        <ToggleDropdownButton
          type="text"
          selected={false}
          variant="primary"
          leftButtonChildren="Controlled"
          rightButtonChildren={<ChevronDown />}
          onRightButtonClick={() => dropdownControl.openDropdown()}
          dropdownMenu={
            <DropdownMenu
              open={dropdownControl.isOpen}
              onOpenChange={dropdownControl.setIsOpen}
            >
              <DropdownMenuTrigger asChild>
                <button
                  className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-0"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="glass-effect border-stroke-inverse-slate-01 rounded-unit-corner-radius-3xl min-w-[100px] border"
                align="end"
                sideOffset={4}
                onEscapeKeyDown={dropdownControl.closeDropdown}
                onInteractOutside={dropdownControl.closeDropdown}
              >
                <DropdownMenuGroup>
                  {menuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.value}
                      className="hover:bg-dropdown-bg-hover cursor-pointer"
                      onSelect={() => {
                        item.onClick();
                      }}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
        <p className="text-sm text-gray-600">Last action: {action}</p>
        <p className="text-sm text-gray-600">
          Dropdown is {dropdownControl.isOpen ? "open" : "closed"}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how to control the dropdown programmatically using the useToggleDropdown hook.",
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);
    const [count, setCount] = useState(0);
    const dropdownControl = useToggleDropdown();

    const menuItems = [
      {
        value: "reset",
        label: "Reset Counter",
        onClick: () => {
          setCount(0);
          setSelected(false);
          dropdownControl.closeDropdown();
        },
      },
      {
        value: "increment",
        label: "Increment",
        onClick: () => {
          setCount(count + 1);
          dropdownControl.closeDropdown();
        },
      },
    ];

    return (
      <div className="flex flex-col gap-4">
        <ToggleDropdownButton
          type="text"
          selected={selected}
          variant="primary"
          leftButtonChildren={`Clicked ${count} times`}
          rightButtonChildren={<ChevronDown />}
          onLeftButtonClick={() => {
            setSelected(!selected);
            setCount(count + 1);
          }}
          onRightButtonClick={() => dropdownControl.openDropdown()}
          dropdownMenu={
            <DropdownMenu
              open={dropdownControl.isOpen}
              onOpenChange={dropdownControl.setIsOpen}
            >
              <DropdownMenuTrigger asChild>
                <button
                  className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-0"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="glass-effect border-stroke-inverse-slate-01 rounded-unit-corner-radius-3xl min-w-[100px] border"
                align="end"
                sideOffset={4}
                onEscapeKeyDown={dropdownControl.closeDropdown}
                onInteractOutside={dropdownControl.closeDropdown}
              >
                <DropdownMenuGroup>
                  {menuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.value}
                      className="hover:bg-dropdown-bg-hover cursor-pointer"
                      onSelect={() => {
                        item.onClick();
                      }}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
        <p className="text-sm text-gray-600">
          Click the left button to toggle selection and increment counter.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example showing state management with the component.",
      },
    },
  },
};

// Using magick-icons
export const WithMagickIcons: Story = {
  render: (args) => {
    const dropdownControl = useToggleDropdown();
    const menuItems = [
      {
        value: "edit",
        label: (
          <div className="flex items-center gap-2">
            <Pen className="size-4" /> Edit
          </div>
        ),
        onClick: () => {
          console.log("Edit clicked");
          dropdownControl.closeDropdown();
        },
      },
      {
        value: "copy",
        label: (
          <div className="flex items-center gap-2">
            <Copy className="size-4" /> Copy
          </div>
        ),
        onClick: () => {
          console.log("Copy clicked");
          dropdownControl.closeDropdown();
        },
      },
      {
        value: "delete",
        label: (
          <div className="flex items-center gap-2">
            <Trash2 className="size-4" /> Delete
          </div>
        ),
        onClick: () => {
          console.log("Delete clicked");
          dropdownControl.closeDropdown();
        },
      },
    ];

    return (
      <ToggleDropdownButton
        {...args}
        onRightButtonClick={() => dropdownControl.openDropdown()}
        dropdownMenu={
          <DropdownMenu
            open={dropdownControl.isOpen}
            onOpenChange={dropdownControl.setIsOpen}
          >
            <DropdownMenuTrigger asChild>
              <button
                className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-0"
                aria-hidden="true"
                tabIndex={-1}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="glass-effect border-stroke-inverse-slate-01 rounded-unit-corner-radius-3xl min-w-[100px] border"
              align="end"
              sideOffset={4}
              onEscapeKeyDown={dropdownControl.closeDropdown}
              onInteractOutside={dropdownControl.closeDropdown}
            >
              <DropdownMenuGroup>
                {menuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.value}
                    className="hover:bg-dropdown-bg-hover cursor-pointer"
                    onSelect={() => {
                      item.onClick();
                    }}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
    );
  },
  args: {
    type: "text",
    selected: false,
    variant: "primary",
    leftButtonChildren: "Hello",
    rightButtonChildren: <MagickChevronDown />,
  },
  parameters: {
    docs: {
      description: {
        story: "Example using magick-icons library for the dropdown icon.",
      },
    },
  },
};

export const LeftButtonDefault: StoryObj<typeof ToggleDropdownLeftButton> = {
  args: {
    type: "text",
    variant: "primary",
    size: "md",
    selected: false,
    children: "Left Button",
  },
};

export const LeftButtonSelected: StoryObj<typeof ToggleDropdownLeftButton> = {
  args: {
    type: "text",
    variant: "primary",
    size: "md",
    selected: true,
    children: "Selected",
  },
};

export const LeftButtonIcon: StoryObj<typeof ToggleDropdownLeftButton> = {
  args: {
    type: "icon",
    variant: "primary",
    size: "md",
    selected: false,
    children: <Settings />,
  },
};

export const LeftButtonAllVariants: StoryObj<typeof ToggleDropdownLeftButton> =
  {
    render: () => (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <ToggleDropdownLeftButton variant="primary" selected={false}>
            Primary
          </ToggleDropdownLeftButton>
          <ToggleDropdownLeftButton variant="primary" selected={true}>
            Primary Selected
          </ToggleDropdownLeftButton>
        </div>
        <div className="flex gap-2">
          <ToggleDropdownLeftButton variant="secondary" selected={false}>
            Secondary
          </ToggleDropdownLeftButton>
          <ToggleDropdownLeftButton variant="secondary" selected={true}>
            Secondary Selected
          </ToggleDropdownLeftButton>
        </div>
        <div className="flex gap-2">
          <ToggleDropdownLeftButton variant="destructive" selected={false}>
            Destructive
          </ToggleDropdownLeftButton>
          <ToggleDropdownLeftButton variant="destructive" selected={true}>
            Destructive Selected
          </ToggleDropdownLeftButton>
        </div>
      </div>
    ),
  };

export const RightButtonDefault: StoryObj<typeof ToggleDropdownRightButton> = {
  args: {
    type: "text",
    variant: "primary",
    size: "md",
    selected: false,
    children: <ChevronDown />,
  },
};

export const RightButtonSelected: StoryObj<typeof ToggleDropdownRightButton> = {
  args: {
    type: "text",
    variant: "primary",
    size: "md",
    selected: true,
    children: <ChevronDown />,
  },
};

export const RightButtonIcon: StoryObj<typeof ToggleDropdownRightButton> = {
  args: {
    type: "icon",
    variant: "primary",
    size: "md",
    selected: false,
    children: <MoreVertical />,
  },
};

export const RightButtonAllVariants: StoryObj<
  typeof ToggleDropdownRightButton
> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <ToggleDropdownRightButton variant="primary" selected={false}>
          <ChevronDown />
        </ToggleDropdownRightButton>
        <ToggleDropdownRightButton variant="primary" selected={true}>
          <ChevronDown />
        </ToggleDropdownRightButton>
      </div>
      <div className="flex gap-2">
        <ToggleDropdownRightButton variant="secondary" selected={false}>
          <ChevronDown />
        </ToggleDropdownRightButton>
        <ToggleDropdownRightButton variant="secondary" selected={true}>
          <ChevronDown />
        </ToggleDropdownRightButton>
      </div>
      <div className="flex gap-2">
        <ToggleDropdownRightButton variant="destructive" selected={false}>
          <ChevronDown />
        </ToggleDropdownRightButton>
        <ToggleDropdownRightButton variant="destructive" selected={true}>
          <ChevronDown />
        </ToggleDropdownRightButton>
      </div>
    </div>
  ),
};
