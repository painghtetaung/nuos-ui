import type { Meta, StoryObj } from "@storybook/react";

import "@/styles.css";
import { Radio } from ".";

const meta: Meta<typeof Radio> = {
  title: "Common/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      control: "object",
      description: "Array of radio options with label and value",
    },
    defaultValue: {
      control: "text",
      description: "The default selected value",
    },
    value: {
      control: "text",
      description: "The controlled selected value",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio group is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    options: [
      { label: "Option 1", value: "option-1" },
      { label: "Option 2", value: "option-2" },
      { label: "Option 3", value: "option-3" },
    ],
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: [
      { label: "Option 1", value: "option-1" },
      { label: "Option 2", value: "option-2" },
      { label: "Option 3", value: "option-3" },
    ],
    defaultValue: "option-2",
  },
};

export const Disabled: Story = {
  args: {
    options: [
      { label: "Option 1", value: "option-1" },
      { label: "Option 2", value: "option-2" },
      { label: "Option 3", value: "option-3" },
    ],
    disabled: true,
  },
};

export const CustomClass: Story = {
  args: {
    options: [
      { label: "Option 1", value: "option-1" },
      { label: "Option 2", value: "option-2" },
      { label: "Option 3", value: "option-3" },
    ],
    className: "gap-4",
  },
};

export const LongLabels: Story = {
  args: {
    options: [
      {
        label:
          "This is a radio option with a very long label that might wrap to multiple lines",
        value: "option-1",
      },
      {
        label:
          "Another option with a long label to demonstrate text wrapping behavior",
        value: "option-2",
      },
      { label: "Short option", value: "option-3" },
    ],
  },
};
