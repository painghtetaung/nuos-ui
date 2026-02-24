import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from ".";

const meta: Meta<typeof PasswordInput> = {
  title: "Common/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The value of the password input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the password input",
    },
    disabled: {
      control: "boolean",
      description: "Whether the password input is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the password input is required",
    },
    "aria-invalid": {
      control: "boolean",
      description: "Whether the password input is in an error state",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    id: {
      control: "text",
      description: "The ID of the password input",
    },
    name: {
      control: "text",
      description: "The name of the password input",
    },
    minLength: {
      control: "number",
      description: "Minimum length of the password",
    },
    maxLength: {
      control: "number",
      description: "Maximum length of the password",
    },
    autoComplete: {
      control: "select",
      options: ["on", "off", "current-password", "new-password"],
      description: "Autocomplete behavior of the password input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter password",
    onChange: (e) => console.log("Password value:", e.target.value),
  },
};

export const WithValue: Story = {
  args: {
    value: "mysecretpassword",
    onChange: (e) => console.log("Password value:", e.target.value),
  },
};

export const WithLabel: Story = {
  args: {
    id: "password-input",
    placeholder: "Enter password",
    onChange: (e) => console.log("Password value:", e.target.value),
  },
};

export const Required: Story = {
  args: {
    required: true,
    placeholder: "Required password",
    onChange: (e) => console.log("Password value:", e.target.value),
  },
};

export const WithMinLength: Story = {
  args: {
    minLength: 8,
    placeholder: "Minimum 8 characters",
    onChange: (e) => console.log("Password value:", e.target.value),
  },
};

export const WithMaxLength: Story = {
  args: {
    maxLength: 20,
    placeholder: "Maximum 20 characters",
    onChange: (e) => console.log("Password value:", e.target.value),
  },
};

export const WithAutoComplete: Story = {
  args: {
    autoComplete: "new-password",
    placeholder: "New password",
    onChange: (e) => console.log("Password value:", e.target.value),
  },
};

export const Error: Story = {
  args: {
    value: "invalid-password",
    "aria-invalid": true,
    placeholder: "Error state",
    onChange: (e) => console.log("Password value:", e.target.value),
  },
};

export const Disabled: Story = {
  args: {
    value: "disabled-password",
    disabled: true,
    placeholder: "Disabled password",
    onChange: (e) => console.log("Password value:", e.target.value),
  },
};

export const CustomClass: Story = {
  args: {
    placeholder: "Custom styled password input",
    className: "w-96",
    onChange: (e) => console.log("Password value:", e.target.value),
  },
};
