import type { Meta, StoryObj } from "@storybook/react";
import {
  FileTextIcon,
  VideoIcon,
  UsersIcon,
  CalendarIcon,
  SettingsIcon,
} from "lucide-react";
import IconProfile from "./index";

const sizeOptions = [26, 32, 40, 48, 56, 64] as const;
const colorOptions = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
] as const;

const meta: Meta<typeof IconProfile> = {
  title: "Common/IconProfile",
  component: IconProfile,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Icon profile container with glassmorphism effect featuring a colored background glow and translucent glass panel. The component uses a radial gradient and colored background div to create a cohesive color-blended visual effect behind the glass panel.",
      },
    },
  },
  argTypes: {
    icon: {
      control: false,
      description: "The icon component to display (ReactNode).",
    },
    color: {
      control: { type: "select" },
      options: colorOptions,
      description:
        "Color variant for the icon and background glow. Controls both the icon color and the background gradient/glow.",
    },
    size: {
      control: { type: "select" },
      options: sizeOptions,
      description:
        "Size variant in pixels. Each size has optimized icon size, border radius, and background scale.",
    },
    className: {
      control: "text",
      description: "Optional additional classes for the root container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconProfile>;

export const Default: Story = {
  args: {
    icon: <FileTextIcon />,
    size: 64,
    color: "red",
  },
};

export const CustomColor: Story = {
  args: {
    icon: <FileTextIcon />,
    size: 64,
    color: "blue",
  },
  parameters: {
    docs: {
      description: {
        story: "Example with a custom color (blue).",
      },
    },
  },
};

export const AllSizes: Story = {
  args: {
    icon: <FileTextIcon />,
    color: "red",
  },
  render: (args) => (
    <div className="flex flex-wrap items-end gap-6">
      {sizeOptions.map((size) => (
        <div className="flex flex-col items-center gap-2" key={size}>
          <IconProfile {...args} size={size} />
          <span className="text-muted-foreground text-xs font-medium uppercase">
            {size}px
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visual reference of every supported size option.",
      },
    },
  },
};

export const AllColors: Story = {
  args: {
    icon: <FileTextIcon />,
    size: 64,
  },
  render: (args) => (
    <div className="flex flex-wrap items-end gap-6">
      {colorOptions.map((color) => (
        <div className="flex flex-col items-center gap-2" key={color}>
          <IconProfile {...args} color={color} />
          <span className="text-muted-foreground text-xs font-medium uppercase">
            {color}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visual reference of all available color options.",
      },
    },
  },
};

export const DifferentIcons: Story = {
  args: {
    size: 64,
    color: "blue",
  },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <IconProfile {...args} icon={<FileTextIcon />} />
        <span className="text-muted-foreground text-xs font-medium">
          Document
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconProfile {...args} icon={<VideoIcon />} color="red" />
        <span className="text-muted-foreground text-xs font-medium">Video</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconProfile {...args} icon={<UsersIcon />} color="green" />
        <span className="text-muted-foreground text-xs font-medium">Users</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconProfile {...args} icon={<CalendarIcon />} color="purple" />
        <span className="text-muted-foreground text-xs font-medium">
          Calendar
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconProfile {...args} icon={<SettingsIcon />} color="slate" />
        <span className="text-muted-foreground text-xs font-medium">
          Settings
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Examples showing different icon types with various color combinations.",
      },
    },
  },
};

export const CustomBackground: Story = {
  args: {
    icon: <FileTextIcon />,
    size: 64,
    color: "amber",
    className: "bg-slate-900 p-4 rounded-lg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates applying a custom background via the className prop.",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    icon: <FileTextIcon />,
    size: 64,
    color: "blue",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example - use the controls below to change the size and color.",
      },
    },
  },
};
