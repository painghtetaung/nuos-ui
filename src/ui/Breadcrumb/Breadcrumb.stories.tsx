import "@/styles.css";
import type { Meta, StoryObj } from "@storybook/react";
import { Book, Home, Palette, Puzzle, Settings, Users } from "lucide-react";
import { Breadcrumb } from ".";

const meta: Meta<typeof Breadcrumb> = {
  title: "Common/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A breadcrumb component that shows the current page's location within a navigational hierarchy.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Basic: Story = {
  args: {
    items: [
      { label: "Home", href: "#", onlyIcon: <Home /> },
      { label: "Docs", href: "#", leadingIcon: <Book /> },
      { label: "Breadcrumb" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Default breadcrumb with three items",
      },
    },
  },
};

export const WithDisabledState: Story = {
  args: {
    items: [
      { label: "Home", href: "#", onlyIcon: <Home />, disabled: true },
      {
        label: "Settings",
        href: "#",
        leadingIcon: <Settings />,
        disabled: true,
      },
      { label: "Users", href: "#", leadingIcon: <Users />, disabled: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb with an disabled state on the last item.",
      },
    },
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: "Home", href: "#", onlyIcon: <Home /> },
      { label: "Docs", href: "#", leadingIcon: <Book /> },
      { label: "Themes", href: "#", leadingIcon: <Palette /> },
      { label: "Components", href: "#", leadingIcon: <Puzzle /> },
      { label: "Breadcrumb", disabled: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Long breadcrumb path that automatically collapses middle items into a dropdown menu.",
      },
    },
  },
};
