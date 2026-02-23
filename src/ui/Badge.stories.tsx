import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  argTypes: {
    type: {
      control: "select",
      options: [
        "primary-hard",
        "primary-soft",
        "destructive-hard",
        "destructive-soft",
        "secondary-hard",
        "secondary-soft",
      ],
    },
    size: { control: "select", options: ["sm", "md"] },
    rounded: { control: "boolean" },
  },
  args: {
    children: "Badge",
    type: "primary-hard",
    size: "sm",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const PrimaryHard: Story = {
  args: { type: "primary-hard", children: "Primary" },
};

export const PrimarySoft: Story = {
  args: { type: "primary-soft", children: "Primary Soft" },
};

export const DestructiveHard: Story = {
  args: { type: "destructive-hard", children: "Error" },
};

export const DestructiveSoft: Story = {
  args: { type: "destructive-soft", children: "Warning" },
};

export const SecondaryHard: Story = {
  args: { type: "secondary-hard", children: "Secondary" },
};

export const SecondarySoft: Story = {
  args: { type: "secondary-soft", children: "Neutral" },
};

export const Rounded: Story = {
  args: { rounded: true, children: "Rounded" },
};

export const MediumSize: Story = {
  args: { size: "md", children: "Medium" },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge type="primary-hard">Primary Hard</Badge>
      <Badge type="primary-soft">Primary Soft</Badge>
      <Badge type="destructive-hard">Destructive Hard</Badge>
      <Badge type="destructive-soft">Destructive Soft</Badge>
      <Badge type="secondary-hard">Secondary Hard</Badge>
      <Badge type="secondary-soft">Secondary Soft</Badge>
    </div>
  ),
};
