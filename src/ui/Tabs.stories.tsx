import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./Tabs";
import type { TabItem } from "./Tabs";
import { Bell, Home, Settings, User } from "lucide-react";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const sampleTabs: TabItem[] = [
  { value: "overview", label: "Overview", content: <p>Overview content</p> },
  { value: "analytics", label: "Analytics", content: <p>Analytics content</p> },
  { value: "reports", label: "Reports", content: <p>Reports content</p> },
];

export const Default: Story = {
  args: {
    defaultActiveTab: "overview",
    tabs: sampleTabs,
  },
};

export const WithIcons: Story = {
  args: {
    defaultActiveTab: "home",
    tabs: [
      {
        value: "home",
        label: "Home",
        icon: <Home className="size-4" />,
        content: <p>Home content</p>,
      },
      {
        value: "profile",
        label: "Profile",
        icon: <User className="size-4" />,
        content: <p>Profile content</p>,
      },
      {
        value: "settings",
        label: "Settings",
        icon: <Settings className="size-4" />,
        content: <p>Settings content</p>,
      },
    ],
  },
};

export const WithNotification: Story = {
  args: {
    defaultActiveTab: "inbox",
    tabs: [
      { value: "inbox", label: "Inbox", notification: true, content: <p>Inbox content</p> },
      { value: "sent", label: "Sent", content: <p>Sent content</p> },
      { value: "drafts", label: "Drafts", count: 5, content: <p>Drafts content</p> },
    ],
  },
};

export const Small: Story = {
  args: {
    defaultActiveTab: "tab1",
    tabSmall: true,
    tabs: [
      { value: "tab1", label: "Tab 1", content: <p>Tab 1 content</p> },
      { value: "tab2", label: "Tab 2", content: <p>Tab 2 content</p> },
      { value: "tab3", label: "Tab 3", content: <p>Tab 3 content</p> },
    ],
  },
};
