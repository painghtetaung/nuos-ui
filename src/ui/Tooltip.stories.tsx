import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip, TooltipProvider } from "./Tooltip";
import { Button } from "./Button";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="p-20">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
  argTypes: {
    position: {
      control: "select",
      options: [
        "top",
        "top-center",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-center",
        "bottom-right",
        "left",
        "right",
      ],
    },
    withArrow: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    trigger: <Button>Hover me</Button>,
    content: "This is a tooltip",
    position: "top",
  },
};

export const Bottom: Story = {
  args: {
    trigger: <Button variant="outline">Bottom tooltip</Button>,
    content: "Tooltip on bottom",
    position: "bottom",
  },
};

export const Left: Story = {
  args: {
    trigger: <Button variant="secondary">Left</Button>,
    content: "Tooltip on left",
    position: "left",
  },
};

export const Right: Story = {
  args: {
    trigger: <Button variant="soft">Right</Button>,
    content: "Tooltip on right",
    position: "right",
  },
};

export const WithoutArrow: Story = {
  args: {
    trigger: <Button variant="ghost">No arrow</Button>,
    content: "Tooltip without arrow",
    withArrow: false,
  },
};

export const RichContent: Story = {
  args: {
    trigger: <Button>Rich tooltip</Button>,
    content: (
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Shortcut</p>
        <p className="opacity-70">Ctrl + K</p>
      </div>
    ),
    disableHoverableContent: false,
  },
};
