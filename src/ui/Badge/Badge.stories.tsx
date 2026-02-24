import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from ".";

const meta: Meta<typeof Badge> = {
  title: "Common/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "primary-hard",
        "primary-soft",
        "destructive-hard",
        "destructive-soft",
      ],
      description: "The variant type of the badge",
    },
    children: {
      control: "text",
      description: "The content of the badge",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const PrimaryHard: Story = {
  args: {
    type: "primary-hard",
    children: "99+",
  },
};

export const PrimarySoft: Story = {
  args: {
    type: "primary-soft",
    children: "99+",
  },
};

export const DestructiveHard: Story = {
  args: {
    type: "destructive-hard",
    children: "99+",
  },
};

export const DestructiveSoft: Story = {
  args: {
    type: "destructive-soft",
    children: "99+",
  },
};

export const WithCustomClass: Story = {
  args: {
    type: "primary-soft",
    children: "99+",
    className: "bg-blue-500 text-white",
  },
};

export const LongText: Story = {
  args: {
    type: "primary-soft",
    children: "This is a badge with a longer text content",
  },
};
