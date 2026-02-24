import type { Meta, StoryObj } from "@storybook/react";
import { SelectInput } from ".";

const meta: Meta<typeof SelectInput> = {
  title: "Common/SelectInput",
  component: SelectInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The currently selected value",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no option is selected",
    },
    options: {
      control: "object",
      description: "Array of options with label and value pairs",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    disabled: {
      control: "boolean",
      description: "Whether the select input is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the select input is required",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

const sampleOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
    value: undefined,
    onChange: (value) => console.log("Selected value:", value),
  },
};

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: "2",
    onChange: (value) => console.log("Selected value:", value),
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    value: "1",
    disabled: true,
    onChange: (value) => console.log("Selected value:", value),
  },
};

export const CustomClass: Story = {
  args: {
    options: sampleOptions,
    className: "w-64",
    placeholder: "Custom width",
    onChange: (value) => console.log("Selected value:", value),
  },
};

export const LongOptions: Story = {
  args: {
    options: [
      { label: "This is a very long option text that might wrap", value: "1" },
      { label: "Another long option with different content", value: "2" },
      { label: "Short option", value: "3" },
    ],
    placeholder: "Select from long options",
    onChange: (value) => console.log("Selected value:", value),
  },
};
