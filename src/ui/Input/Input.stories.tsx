import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Search, User } from "lucide-react";
import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "Common/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "number", "url", "tel", "search"],
      description: "The type of input field",
    },
    label: {
      control: "text",
      description: "Label for the input field",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    error: {
      control: "boolean",
      description: "Whether the input is in an error state",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    value: {
      control: "text",
      description: "The value of the input",
    },
    prefixNode: {
      control: "object",
      description: "Node to be displayed before the input",
    },
    suffixNode: {
      control: "object",
      description: "Node to be displayed after the input",
    },
    includeCopy: {
      control: "boolean",
      description: "Whether to show copy button",
    },
    includeClear: {
      control: "boolean",
      description: "Whether to show clear button",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    onChange: (e) => console.log("Input value:", e.target.value),
  },
};

export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    onChange: (e) => console.log("Input value:", e.target.value),
  },
};

export const WithPrefix: Story = {
  args: {
    prefixNode: {
      node: <User className="text-text-inactive size-4" />,
      withBorder: false,
    },
    placeholder: "Enter username",
    onChange: (e) => console.log("Input value:", e.target.value),
  },
};

export const WithSuffix: Story = {
  args: {
    suffixNode: {
      node: <Search className="text-text-inactive size-4" />,
      withBorder: false,
    },
    placeholder: "Search...",
    onChange: (e) => console.log("Input value:", e.target.value),
  },
};

export const WithCopyButton: Story = {
  args: {
    value: "Copy me!",
    includeCopy: true,
    onChange: (e) => console.log("Input value:", e.target.value),
  },
};

export const WithClearButton: Story = {
  args: {
    value: "Clear me!",
    includeClear: true,
    onChange: (e) => console.log("Input value:", e.target.value),
  },
};

export const Disabled: Story = {
  args: {
    value: "Disabled input",
    disabled: true,
    onChange: (e) => console.log("Input value:", e.target.value),
  },
};

export const Error: Story = {
  args: {
    value: "Error input",
    error: true,
    onChange: (e) => console.log("Input value:", e.target.value),
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter email",
    prefixNode: {
      node: <Mail className="text-text-inactive size-4" />,
      withBorder: false,
    },
    onChange: (e) => console.log("Input value:", e.target.value),
  },
};

export const URL: Story = {
  args: {
    type: "url",
    placeholder: "example.com",
    onChange: (e) => console.log("Input value:", e.target.value),
  },
};

export const CustomClass: Story = {
  args: {
    placeholder: "Custom styled input",
    className: "w-96",
    onChange: (e) => console.log("Input value:", e.target.value),
  },
};
