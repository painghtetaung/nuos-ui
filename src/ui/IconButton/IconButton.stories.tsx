import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Edit,
  Heart,
  Home,
  Minus,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
  User,
} from "lucide-react";
import IconButton from "./index";
import { useState } from "react";

const meta: Meta<typeof IconButton> = {
  title: "Common/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A button component that displays only an icon. Perfect for actions that can be represented by a single icon.",
      },
    },
  },
  argTypes: {
    varient: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "soft",
        "outline",
        "ghost",
        "destructive",
      ],
      description: "The visual style variant of the button",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
      description: "The size of the button",
    },
    rounded: {
      control: { type: "boolean" },
      description: "Whether the button should be rounded (circular)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
    },
    colorInFill: {
      control: { type: "boolean" },
      description: "Whether to apply fill colors to the icon",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Default story
export const Default: Story = {
  args: {
    icon: <Play />,
    varient: "primary",
    size: "md",
    rounded: false,
    disabled: false,
    colorInFill: true,
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconButton
        icon={<Play />}
        varient="primary"
        size="md"
        aria-label="Primary"
      />
      <IconButton
        icon={<Play />}
        varient="secondary"
        size="md"
        aria-label="Secondary"
      />
      <IconButton icon={<Play />} varient="soft" size="md" aria-label="Soft" />
      <IconButton
        icon={<Play />}
        varient="outline"
        size="md"
        aria-label="Outline"
      />
      <IconButton
        icon={<Play />}
        varient="ghost"
        size="md"
        aria-label="Ghost"
      />
      <IconButton
        icon={<Play />}
        varient="destructive"
        size="md"
        aria-label="Destructive"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button variants with the same Play icon.",
      },
    },
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton
        icon={<Play />}
        varient="primary"
        size="xs"
        aria-label="Extra Small"
      />
      <IconButton
        icon={<Play />}
        varient="primary"
        size="sm"
        aria-label="Small"
      />
      <IconButton
        icon={<Play />}
        varient="primary"
        size="md"
        aria-label="Medium"
      />
      <IconButton
        icon={<Play />}
        varient="primary"
        size="lg"
        aria-label="Large"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different sizes available for the IconButton component.",
      },
    },
  },
};

// Rounded vs Not Rounded
export const Rounded: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton
        icon={<Play />}
        varient="primary"
        size="md"
        rounded={false}
        aria-label="Not Rounded"
      />
      <IconButton
        icon={<Play />}
        varient="primary"
        size="md"
        rounded={true}
        aria-label="Rounded"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison between rounded and non-rounded buttons.",
      },
    },
  },
};

// Disabled State
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconButton
        icon={<Play />}
        varient="primary"
        size="md"
        disabled={true}
        aria-label="Disabled Primary"
      />
      <IconButton
        icon={<Play />}
        varient="secondary"
        size="md"
        disabled={true}
        aria-label="Disabled Secondary"
      />
      <IconButton
        icon={<Play />}
        varient="outline"
        size="md"
        disabled={true}
        aria-label="Disabled Outline"
      />
      <IconButton
        icon={<Play />}
        varient="ghost"
        size="md"
        disabled={true}
        aria-label="Disabled Ghost"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled state for different button variants.",
      },
    },
  },
};

// Color In Fill
export const ColorInFill: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconButton
        icon={<Heart />}
        varient="primary"
        size="md"
        colorInFill={true}
        aria-label="Color In Fill True"
      />
      <IconButton
        icon={<Heart />}
        varient="primary"
        size="md"
        colorInFill={false}
        aria-label="Color In Fill False"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Difference between colorInFill true and false. True applies fill colors to SVG paths, false uses text color.",
      },
    },
  },
};

// Common Icons
export const CommonIcons: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <IconButton
        icon={<Play />}
        varient="primary"
        size="md"
        aria-label="Play"
      />
      <IconButton
        icon={<Pause />}
        varient="primary"
        size="md"
        aria-label="Pause"
      />
      <IconButton
        icon={<Heart />}
        varient="primary"
        size="md"
        aria-label="Like"
      />
      <IconButton
        icon={<Settings />}
        varient="secondary"
        size="md"
        aria-label="Settings"
      />
      <IconButton
        icon={<Download />}
        varient="soft"
        size="md"
        aria-label="Download"
      />
      <IconButton
        icon={<Star />}
        varient="outline"
        size="md"
        aria-label="Favorite"
      />
      <IconButton icon={<Edit />} varient="ghost" size="md" aria-label="Edit" />
      <IconButton
        icon={<Trash2 />}
        varient="destructive"
        size="md"
        aria-label="Delete"
      />
      <IconButton
        icon={<Search />}
        varient="primary"
        size="md"
        aria-label="Search"
      />
      <IconButton
        icon={<Plus />}
        varient="primary"
        size="md"
        aria-label="Add"
      />
      <IconButton
        icon={<Minus />}
        varient="secondary"
        size="md"
        aria-label="Remove"
      />
      <IconButton
        icon={<Check />}
        varient="primary"
        size="md"
        aria-label="Confirm"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common icons used in applications with appropriate variants.",
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isStarred, setIsStarred] = useState(false);

    return (
      <div className="flex flex-wrap gap-4">
        <IconButton
          icon={isPlaying ? <Pause /> : <Play />}
          varient="primary"
          size="md"
          rounded={true}
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause" : "Play"}
        />
        <IconButton
          icon={<Heart />}
          varient={isLiked ? "destructive" : "ghost"}
          size="md"
          colorInFill={isLiked}
          onClick={() => setIsLiked(!isLiked)}
          aria-label={isLiked ? "Unlike" : "Like"}
        />
        <IconButton
          icon={<Star />}
          varient={isStarred ? "primary" : "outline"}
          size="md"
          colorInFill={isStarred}
          onClick={() => setIsStarred(!isStarred)}
          aria-label={isStarred ? "Unstar" : "Star"}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example showing state changes with different icons and variants.",
      },
    },
  },
};

// Media Player Example
export const MediaPlayer: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
      <IconButton
        icon={<ArrowLeft />}
        varient="ghost"
        size="sm"
        aria-label="Previous"
      />
      <IconButton
        icon={<Play />}
        varient="primary"
        size="lg"
        rounded={true}
        aria-label="Play"
      />
      <IconButton
        icon={<ArrowRight />}
        varient="ghost"
        size="sm"
        aria-label="Next"
      />
      <div className="ml-4 flex gap-1">
        <IconButton
          icon={<Heart />}
          varient="ghost"
          size="sm"
          aria-label="Like"
        />
        <IconButton
          icon={<Download />}
          varient="ghost"
          size="sm"
          aria-label="Download"
        />
        <IconButton
          icon={<Settings />}
          varient="ghost"
          size="sm"
          aria-label="Settings"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of IconButtons used in a media player interface.",
      },
    },
  },
};

// Navigation Example
export const Navigation: Story = {
  render: () => (
    <div className="flex items-center gap-2 rounded-lg bg-gray-900 p-4">
      <IconButton
        icon={<Home />}
        varient="ghost"
        size="sm"
        aria-label="Home"
        className="text-white"
      />
      <IconButton
        icon={<User />}
        varient="ghost"
        size="sm"
        aria-label="Profile"
        className="text-white"
      />
      <IconButton
        icon={<Settings />}
        varient="ghost"
        size="sm"
        aria-label="Settings"
        className="text-white"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of IconButtons used in navigation with custom styling.",
      },
    },
  },
};

// All Variants Grid
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      {["primary", "secondary", "soft", "outline", "ghost", "destructive"].map(
        (variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <div className="text-sm font-medium capitalize">{variant}</div>
            <IconButton
              icon={<Play />}
              varient={variant as any}
              size="md"
              aria-label={`${variant} button`}
            />
          </div>
        ),
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Grid showing all variants with the same icon for easy comparison.",
      },
    },
  },
};
