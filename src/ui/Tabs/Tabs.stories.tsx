import type { Meta, StoryObj } from "@storybook/react";
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";

import { Tabs } from ".";

const meta: Meta<typeof Tabs> = {
  title: "Common/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    defaultActiveTab: "tab1",
    tabs: [
      {
        value: "tab1",
        label: "Tab 1",
        content: <div>Content for Tab 1</div>,
      },
      {
        value: "tab2",
        label: "Tab 2",
        content: <div>Content for Tab 2</div>,
      },
      {
        value: "tab3",
        label: "Tab 3",
        content: <div>Content for Tab 3</div>,
      },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    defaultActiveTab: "home",
    tabs: [
      {
        value: "home",
        label: "Home",
        icon: <HomeIcon />,
        content: <div>Home Content</div>,
      },
      {
        value: "notifications",
        label: "Notifications",
        icon: <BellIcon />,
        content: <div>Notifications Content</div>,
      },
      {
        value: "profile",
        label: "Profile",
        icon: <UserIcon />,
        content: <div>Profile Content</div>,
      },
    ],
  },
};

export const WithNotifications: Story = {
  args: {
    defaultActiveTab: "inbox",
    tabs: [
      {
        value: "inbox",
        label: "Inbox",
        notification: true,
        content: <div>Inbox Content</div>,
      },
      {
        value: "sent",
        label: "Sent",
        content: <div>Sent Content</div>,
      },
      {
        value: "drafts",
        label: "Drafts",
        content: <div>Drafts Content</div>,
      },
    ],
  },
};

export const WithCountBadges: Story = {
  args: {
    defaultActiveTab: "all",
    tabs: [
      {
        value: "all",
        label: "All",
        count: 12,
        content: <div>All Items</div>,
      },
      {
        value: "unread",
        label: "Unread",
        count: 5,
        content: <div>Unread Items</div>,
      },
      {
        value: "archived",
        label: "Archived",
        count: 3,
        content: <div>Archived Items</div>,
      },
    ],
  },
};

export const CompleteExample: Story = {
  args: {
    defaultActiveTab: "messages",
    tabs: [
      {
        value: "messages",
        label: "Messages",
        icon: <BellIcon />,
        notification: true,
        count: 3,
        content: <div>Messages Content</div>,
      },
      {
        value: "tasks",
        label: "Tasks",
        icon: <HomeIcon />,
        count: 5,
        content: <div>Tasks Content</div>,
      },
      {
        value: "settings",
        label: "Settings",
        icon: <UserIcon />,
        content: <div>Settings Content</div>,
      },
    ],
  },
};

export const SmallTabs: Story = {
  args: {
    defaultActiveTab: "home",
    tabSmall: true,
    tabs: [
      {
        value: "home",
        label: "Home",
        icon: <HomeIcon />,
        content: <div>Home Content</div>,
      },
      {
        value: "notifications",
        label: "Notifications",
        icon: <BellIcon />,
        notification: true,
        content: <div>Notifications Content</div>,
      },
      {
        value: "profile",
        label: "Profile",
        icon: <UserIcon />,
        count: 2,
        content: <div>Profile Content</div>,
      },
    ],
  },
};

export const WithoutContent: Story = {
  args: {
    defaultActiveTab: "tab1",
    showContent: false,
    tabs: [
      {
        value: "tab1",
        label: "Tab 1",
        content: <div>Content for Tab 1</div>,
      },
      {
        value: "tab2",
        label: "Tab 2",
        content: <div>Content for Tab 2</div>,
      },
      {
        value: "tab3",
        label: "Tab 3",
        content: <div>Content for Tab 3</div>,
      },
    ],
  },
};
