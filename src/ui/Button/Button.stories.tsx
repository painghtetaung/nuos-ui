import type { Meta, StoryObj } from "@storybook/react";
import { HomeIcon, UserIcon } from "lucide-react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "If true, the button is disabled",
    },
    prefix: {
      control: "object",
      description: "Element before the label",
    },
    suffix: {
      control: "object",
      description: "Element after the label",
    },
    onlyIcon: {
      control: "boolean",
      description: "If true, renders as an icon-only button",
    },
    asChild: {
      control: "boolean",
      description: "Render as a child component",
    },
    children: {
      control: "text",
      description: "Button content (text or elements)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
    size: "md",
  },
};

export const WithPrefix: Story = {
  args: {
    children: "With Prefix",
    prefix: <HomeIcon />,
    variant: "primary",
    size: "md",
  },
};

export const WithSuffix: Story = {
  args: {
    children: "With Suffix",
    suffix: <UserIcon />,
    variant: "primary",
    size: "md",
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    children: "Prefix & Suffix",
    prefix: <HomeIcon />,
    suffix: <UserIcon />,
    variant: "primary",
    size: "md",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
  args: {
    size: "md",
    children: "Button",
  },
};

export const OnlyIcon: Story = {
  args: {
    children: <HomeIcon />,
    variant: "primary",
    size: "md",
    onlyIcon: true,
    "aria-label": "Home",
  },
};

export const OnlyIconAllSizes: Story = {
  render: (args) => (
    <div className="space-x-2">
      <Button {...args} size="sm" onlyIcon aria-label="Home small">
        Button
      </Button>
      <Button {...args} size="md" onlyIcon aria-label="Home medium">
        Button
      </Button>
      <Button {...args} size="lg" onlyIcon aria-label="Home large">
        Button
      </Button>
    </div>
  ),
  args: {
    variant: "primary",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} variant="primary" disabled>
        Disabled Primary
      </Button>
      <Button {...args} variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button {...args} variant="destructive" disabled>
        Disabled Destructive
      </Button>
      <Button {...args} variant="outline" disabled>
        Disabled Outline
      </Button>
      <Button {...args} variant="ghost" disabled>
        Disabled Ghost
      </Button>
    </div>
  ),
  args: {
    size: "md",
  },
};
