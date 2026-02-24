import "@/styles.css";
import type { Meta, StoryObj } from "@storybook/react";
import { User } from "lucide-react";
import { Chip } from ".";

const meta: Meta<typeof Chip> = {
  title: "Common/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["rounded", "rectangle"],
      description: "The shape variant of the chip",
    },
    color: {
      control: "select",
      options: [
        "slate",
        "red",
        "yellow",
        "green",
        "blue",
        "indigo",
        "purple",
        "pink",
      ],
      description: "The color variant of the chip",
    },
    dot: {
      control: "boolean",
      description: "Whether to show a dot indicator",
    },
    icon: {
      control: "object",
      description: "Whether to show an icon",
    },
    avatar: {
      control: "text",
      description: "URL of the avatar image",
    },
    closeBtn: {
      control: "boolean",
      description: "Whether to show a close button",
    },
    label: {
      control: "text",
      description: "The text content of the chip",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: "Default Chip",
  },
};

export const WithDot: Story = {
  args: {
    label: "With Dot",
    dot: true,
    color: "blue",
  },
};

export const WithIcon: Story = {
  args: {
    label: "With Icon",
    icon: <User className="size-4" />,
    color: "green",
  },
};

export const WithAvatar: Story = {
  args: {
    label: "John Doe",
    avatar: "https://github.com/shadcn.png",
    color: "purple",
  },
};

export const WithCloseButton: Story = {
  args: {
    label: "Closable",
    closeBtn: {
      onClick: () => console.log("Close clicked"),
    },
    color: "red",
  },
};

export const Rectangle: Story = {
  args: {
    label: "Rectangle Chip",
    type: "rectangle",
    color: "indigo",
  },
};

export const CustomClass: Story = {
  args: {
    label: "Custom Styled",
    className: "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
  },
};

export const LongText: Story = {
  args: {
    label: "This is a chip with a longer text content that might wrap",
    color: "yellow",
  },
};
