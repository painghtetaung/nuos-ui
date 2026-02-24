import type { Meta, StoryObj } from "@storybook/react";

import "@/styles.css";
import { Checkbox } from ".";

const meta: Meta<typeof Checkbox> = {
  title: "Common/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The text label for the checkbox",
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in an indeterminate state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Checkbox",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Checkbox",
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Checkbox",
    checked: true,
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Checkbox",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled Checked",
    checked: true,
    disabled: true,
  },
};

export const CustomClass: Story = {
  args: {
    label: "Custom Styled",
    className: "border-primary",
  },
};
