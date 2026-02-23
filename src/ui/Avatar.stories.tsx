import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarStack } from "./Avatar";
import { TooltipProvider } from "./Tooltip";
import type { AvatarProps } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  argTypes: {
    variant: { control: "select", options: ["image", "text", "placeholder"] },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
    },
    status: { control: "select", options: [undefined, "active", "inactive"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const TextAvatar: Story = {
  args: {
    variant: "text",
    fallback: "JD",
    size: "md",
  },
};

export const ImageAvatar: Story = {
  args: {
    variant: "image",
    imgsrc: "https://i.pravatar.cc/150?u=john",
    fallback: "JD",
    size: "md",
  } as AvatarProps,
};

export const Placeholder: Story = {
  args: {
    variant: "placeholder",
    fallback: "?",
    size: "md",
  },
};

export const WithStatus: Story = {
  args: {
    variant: "text",
    fallback: "AB",
    size: "lg",
    status: "active",
  },
};

export const InactiveStatus: Story = {
  args: {
    variant: "text",
    fallback: "CD",
    size: "lg",
    status: "inactive",
  },
};

export const WithTooltip: Story = {
  args: {
    variant: "text",
    fallback: "JD",
    size: "lg",
    tooltip: "John Doe",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"] as const).map(
        (size) => (
          <Avatar key={size} variant="text" fallback="AB" size={size} />
        )
      )}
    </div>
  ),
};

export const Stack: Story = {
  render: () => {
    const avatars: AvatarProps[] = [
      { variant: "text", fallback: "AB" },
      { variant: "text", fallback: "CD" },
      { variant: "text", fallback: "EF" },
      { variant: "text", fallback: "GH" },
      { variant: "text", fallback: "IJ" },
    ];
    return <AvatarStack avatars={avatars} stackCount={3} size="md" />;
  },
};
