import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/ui/Button";
import { Tooltip } from ".";

const meta: Meta<typeof Tooltip> = {
  title: "Common/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
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

export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <Tooltip
        trigger={
          <Button variant="outline" className="w-40">
            Top
          </Button>
        }
        content="Top tooltip"
        position="top"
      />
      <Tooltip
        trigger={<Button variant="outline">Top Left</Button>}
        content="Top left tooltip"
        position="top-left"
      />
      <Tooltip
        trigger={<Button variant="outline">Top Right</Button>}
        content="Top right tooltip"
        position="top-right"
      />
      <Tooltip
        trigger={<Button variant="outline">Left</Button>}
        content="Left tooltip"
        position="left"
      />

      <Tooltip
        trigger={<Button variant="outline">Right</Button>}
        content="Right tooltip"
        position="right"
      />

      <Tooltip
        trigger={<Button variant="outline">Bottom</Button>}
        content="Bottom tooltip"
        position="bottom"
      />
      <Tooltip
        trigger={<Button variant="outline">Bottom Left</Button>}
        content="Bottom left tooltip"
        position="bottom-left"
      />
      <Tooltip
        trigger={<Button variant="outline">Bottom Right</Button>}
        content="Bottom right tooltip"
        position="bottom-right"
      />
    </div>
  ),
};

export const WithCustomContent: Story = {
  args: {
    trigger: <Button>Custom Content</Button>,
    content: (
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Custom Tooltip</h3>
        <p>This tooltip contains custom content with multiple elements</p>
        <Button size="sm">Button</Button>
      </div>
    ),
    position: "top",
  },
};
