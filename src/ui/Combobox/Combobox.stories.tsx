import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Combobox } from ".";

const meta: Meta<typeof Combobox> = {
  title: "Common/Combobox",
  component: Combobox,
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
      description: "Whether the combobox is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const sampleOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <Combobox {...args} value={value} onChange={setValue} />;
  },
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState("2");
    return <Combobox {...args} value={value} onChange={setValue} />;
  },
  args: {
    options: sampleOptions,
    placeholder: "Select an option",
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState("1");
    return <Combobox {...args} value={value} onChange={setValue} disabled />;
  },
  args: {
    options: sampleOptions,
    placeholder: "Disabled combobox",
    disabled: true,
  },
};

export const LongOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const longOptions = Array.from({ length: 30 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `${i + 1}`,
    }));
    return (
      <Combobox
        {...args}
        options={longOptions}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    placeholder: "Select from many options",
  },
};
