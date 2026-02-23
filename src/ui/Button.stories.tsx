import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { ArrowRight, Download, Loader2, Plus, Send, Trash2 } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "soft",
        "ai-filled",
        "ai-outline",
        "glass",
      ],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    state: { control: "select", options: ["default", "loading"] },
    disabled: { control: "boolean" },
    onlyIcon: { control: "boolean" },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

export const Soft: Story = {
  args: { variant: "soft", children: "Soft" },
};

export const Glass: Story = {
  args: { variant: "glass", children: "Glass" },
};

export const AiFilled: Story = {
  args: { variant: "ai-filled", children: "AI Generate" },
};

export const AiOutline: Story = {
  args: { variant: "ai-outline", children: "AI Generate" },
};

export const WithPrefix: Story = {
  args: { children: "Download", prefix: <Download /> },
};

export const WithSuffix: Story = {
  args: { children: "Next", suffix: <ArrowRight /> },
};

export const WithPrefixAndSuffix: Story = {
  args: { children: "Send", prefix: <Send />, suffix: <ArrowRight /> },
};

export const IconOnly: Story = {
  args: { children: <Plus />, onlyIcon: true },
};

export const Loading: Story = {
  args: { children: "Saving...", state: "loading" },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="glass">Glass</Button>
    </div>
  ),
};
