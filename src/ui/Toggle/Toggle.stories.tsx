import type { Meta, StoryObj } from "@storybook/react";
import { BoldIcon } from "lucide-react";

import { Toggle } from ".";

const meta: Meta<typeof Toggle> = {
  title: "Common/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    shape: {
      control: "select",
      options: ["rectangle", "rounded"],
      description: "The shape variant of the toggle",
    },
    style: {
      control: "select",
      options: ["ghost", "outline", "soft"],
      description: "The style variant of the toggle",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the toggle",
    },
    active: {
      control: "boolean",
      description: "Whether the toggle is in the active/pressed state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the toggle is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// Rectangle shape variants
export const RectangleGhost: Story = {
  args: {
    shape: "rectangle",
    style: "ghost",
    children: <BoldIcon />,
  },
};

export const RectangleOutline: Story = {
  args: {
    shape: "rectangle",
    style: "outline",
    children: <BoldIcon />,
  },
};

export const RectangleSoft: Story = {
  args: {
    shape: "rectangle",
    style: "soft",
    children: <BoldIcon />,
  },
};

// Rounded shape variants
export const RoundedGhost: Story = {
  args: {
    shape: "rounded",
    style: "ghost",
    children: <BoldIcon />,
  },
};

export const RoundedOutline: Story = {
  args: {
    shape: "rounded",
    style: "outline",
    children: <BoldIcon />,
  },
};

export const RoundedSoft: Story = {
  args: {
    shape: "rounded",
    style: "soft",
    children: <BoldIcon />,
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: "sm",
    shape: "rectangle",
    style: "soft",
    children: <BoldIcon />,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    shape: "rectangle",
    style: "soft",
    children: <BoldIcon />,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    shape: "rectangle",
    style: "soft",
    children: <BoldIcon />,
  },
};

// State variants
export const Active: Story = {
  args: {
    active: true,
    shape: "rectangle",
    style: "soft",
    children: <BoldIcon />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    shape: "rectangle",
    style: "soft",
    children: <BoldIcon />,
  },
};

export const ActiveDisabled: Story = {
  args: {
    active: true,
    disabled: true,
    shape: "rectangle",
    style: "soft",
    children: <BoldIcon />,
  },
};

// All variants grid showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Rectangle Shape</h3>
        <div className="flex flex-wrap gap-4">
          <Toggle shape="rectangle" style="ghost" size="sm">
            <BoldIcon />
          </Toggle>
          <Toggle shape="rectangle" style="ghost" size="md">
            <BoldIcon />
          </Toggle>
          <Toggle shape="rectangle" style="outline" size="sm">
            <BoldIcon />
          </Toggle>
          <Toggle shape="rectangle" style="outline" size="md">
            <BoldIcon />
          </Toggle>
          <Toggle shape="rectangle" style="soft" size="sm">
            <BoldIcon />
          </Toggle>
          <Toggle shape="rectangle" style="soft" size="md">
            <BoldIcon />
          </Toggle>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Rounded Shape</h3>
        <div className="flex flex-wrap gap-4">
          <Toggle shape="rounded" style="ghost" size="sm">
            <BoldIcon />
          </Toggle>
          <Toggle shape="rounded" style="ghost" size="md">
            <BoldIcon />
          </Toggle>
          <Toggle shape="rounded" style="outline" size="sm">
            <BoldIcon />
          </Toggle>
          <Toggle shape="rounded" style="outline" size="md">
            <BoldIcon />
          </Toggle>
          <Toggle shape="rounded" style="soft" size="sm">
            <BoldIcon />
          </Toggle>
          <Toggle shape="rounded" style="soft" size="md">
            <BoldIcon />
          </Toggle>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Active States</h3>
        <div className="flex flex-wrap gap-4">
          <Toggle shape="rectangle" style="ghost" size="sm" active>
            <BoldIcon />
          </Toggle>
          <Toggle shape="rectangle" style="outline" size="sm" active>
            <BoldIcon />
          </Toggle>
          <Toggle shape="rectangle" style="soft" size="sm" active>
            <BoldIcon />
          </Toggle>
          <Toggle shape="rounded" style="ghost" size="sm" active>
            <BoldIcon />
          </Toggle>
          <Toggle shape="rounded" style="outline" size="sm" active>
            <BoldIcon />
          </Toggle>
          <Toggle shape="rounded" style="soft" size="sm" active>
            <BoldIcon />
          </Toggle>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Disabled States</h3>
        <div className="flex flex-wrap gap-4">
          <Toggle shape="rectangle" style="ghost" size="sm" disabled>
            <BoldIcon />
          </Toggle>
          <Toggle shape="rectangle" style="outline" size="sm" disabled>
            <BoldIcon />
          </Toggle>
          <Toggle shape="rectangle" style="soft" size="sm" disabled>
            <BoldIcon />
          </Toggle>
          <Toggle shape="rectangle" style="soft" size="sm" active disabled>
            <BoldIcon />
          </Toggle>
        </div>
      </div>
    </div>
  ),
};
