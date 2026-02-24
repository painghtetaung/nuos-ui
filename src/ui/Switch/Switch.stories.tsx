import type { Meta, StoryObj } from "@storybook/react";

import "@/styles.css";

import { Switch } from ".";

const meta: Meta<typeof Switch> = {
  title: "Common/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The text label for the switch",
    },
    checked: {
      control: "boolean",
      description: "Whether the switch is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    onCheckedChange: {
      action: "checked",
      description: "Callback when the switch state changes",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    checked: false,
    onCheckedChange: () => {},
  },
};

export const WithLabel: Story = {
  args: {
    label: "Switch Label",
    checked: false,
    onCheckedChange: () => {},
  },
};

export const Checked: Story = {
  args: {
    label: "Checked Switch",
    checked: true,
    onCheckedChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Switch",
    checked: false,
    disabled: true,
    onCheckedChange: () => {},
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled Checked",
    checked: true,
    disabled: true,
    onCheckedChange: () => {},
  },
};

export const CustomClass: Story = {
  args: {
    label: "Custom Styled",
    className: "w-[50px] h-[30px]",
    checked: false,
    onCheckedChange: () => {},
  },
};
