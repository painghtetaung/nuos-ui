import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { useState } from "react";
import { Search, Mail } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  argTypes: {
    variant: { control: "select", options: ["outline", "ghost"] },
    disabled: { control: "boolean" },
    includeCopy: { control: "boolean" },
    includeClear: { control: "boolean" },
  },
  args: {
    placeholder: "Enter text...",
    variant: "outline",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Type something..." },
};

export const Ghost: Story = {
  args: { variant: "ghost", placeholder: "Ghost input..." },
};

export const WithError: Story = {
  args: { "aria-invalid": true, placeholder: "Invalid input..." },
};

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled input" },
};

export const WithPrefixIcon: Story = {
  args: {
    placeholder: "Search...",
    prefixNode: { node: <Search className="size-4" />, className: "pl-3" },
  },
};

export const WithSuffixIcon: Story = {
  args: {
    placeholder: "Email...",
    suffixNode: { node: <Mail className="size-4" /> },
  },
};

export const WithCopyAndClear: Story = {
  render: () => {
    const [value, setValue] = useState("Copy or clear me");
    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        includeCopy
        includeClear
        className="w-80"
      />
    );
  },
};

export const URLInput: Story = {
  args: { type: "url", placeholder: "example.com" },
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Input variant="outline" placeholder="Outline variant" />
      <Input variant="ghost" placeholder="Ghost variant" />
      <Input aria-invalid placeholder="Error state" />
      <Input disabled placeholder="Disabled" />
    </div>
  ),
};
