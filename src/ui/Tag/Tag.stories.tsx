import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./index";

const meta: Meta<typeof Tag> = {
  title: "Common/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive"],
      description: "The visual style variant of the tag",
    },
    label: {
      control: "text",
      description: "The text content of the tag",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the tag",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: {
    label: "Primary Tag",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Tag",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    label: "Destructive Tag",
    variant: "destructive",
  },
};

export const WithCustomClass: Story = {
  args: {
    label: "Custom Tag",
    variant: "primary",
    className: "px-4",
  },
};
