import type { Meta, StoryObj } from "@storybook/react";
import {
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
import IconContainer from "./index";

const meta: Meta<typeof IconContainer> = {
  title: "Common/IconContainer",
  component: IconContainer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A container component that wraps icons and provides consistent sizing, styling, and animation capabilities. Supports both static icons and animated Lottie animations.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
      ],
      description: "The size of the icon container",
    },
    colorInFill: {
      control: { type: "boolean" },
      description:
        "Whether to apply fill colors to SVG paths (true) or use text color (false)",
    },
    type: {
      control: { type: "select" },
      options: ["static", "animated"],
      description:
        "Type of icon - static for regular icons, animated for Lottie animations",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconContainer>;

// Default story
export const Default: Story = {
  args: {
    children: <Play />,
    type: "static",
    size: "sm",
    colorInFill: true,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-gray-600">xs</div>
        <IconContainer size="xs" colorInFill={true}>
          <Play />
        </IconContainer>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-gray-600">sm</div>
        <IconContainer size="sm" colorInFill={true}>
          <Play />
        </IconContainer>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-gray-600">md</div>
        <IconContainer size="md" colorInFill={true}>
          <Play />
        </IconContainer>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-gray-600">lg</div>
        <IconContainer size="lg" colorInFill={true}>
          <Play />
        </IconContainer>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-gray-600">xl</div>
        <IconContainer size="xl" colorInFill={true}>
          <Play />
        </IconContainer>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-gray-600">2xl</div>
        <IconContainer size="2xl" colorInFill={true}>
          <Play />
        </IconContainer>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available sizes for the IconContainer component.",
      },
    },
  },
};

// Extra Large Sizes
export const ExtraLargeSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-gray-600">3xl</div>
        <IconContainer size="3xl" colorInFill={true}>
          <Play />
        </IconContainer>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-gray-600">4xl</div>
        <IconContainer size="4xl" colorInFill={true}>
          <Play />
        </IconContainer>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-gray-600">5xl</div>
        <IconContainer size="5xl" colorInFill={true}>
          <Play />
        </IconContainer>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-gray-600">6xl</div>
        <IconContainer size="6xl" colorInFill={true}>
          <Play />
        </IconContainer>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Extra large sizes for special use cases like hero sections or large displays.",
      },
    },
  },
};

// Color In Fill
export const ColorInFill: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-medium">colorInFill: true</div>
        <IconContainer size="lg" colorInFill={true}>
          <Heart />
        </IconContainer>
        <div className="text-xs text-gray-600">Uses fill colors</div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-medium">colorInFill: false</div>
        <IconContainer size="lg" colorInFill={false}>
          <Heart />
        </IconContainer>
        <div className="text-xs text-gray-600">Uses text color</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Difference between colorInFill true and false. True applies fill colors to SVG paths, false uses text color for the icon.",
      },
    },
  },
};

// Common Icons
export const CommonIcons: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6">
      <IconContainer size="md" colorInFill={true}>
        <Play />
      </IconContainer>
      <IconContainer size="md" colorInFill={true}>
        <Pause />
      </IconContainer>
      <IconContainer size="md" colorInFill={true}>
        <Heart />
      </IconContainer>
      <IconContainer size="md" colorInFill={true}>
        <Settings />
      </IconContainer>
      <IconContainer size="md" colorInFill={true}>
        <Download />
      </IconContainer>
      <IconContainer size="md" colorInFill={true}>
        <Star />
      </IconContainer>
      <IconContainer size="md" colorInFill={true}>
        <Edit />
      </IconContainer>
      <IconContainer size="md" colorInFill={true}>
        <Trash2 />
      </IconContainer>
      <IconContainer size="md" colorInFill={true}>
        <Search />
      </IconContainer>
      <IconContainer size="md" colorInFill={true}>
        <Plus />
      </IconContainer>
      <IconContainer size="md" colorInFill={true}>
        <Minus />
      </IconContainer>
      <IconContainer size="md" colorInFill={true}>
        <Check />
      </IconContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common icons wrapped in IconContainer with consistent sizing.",
      },
    },
  },
};

// Custom Styling
export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconContainer
        size="lg"
        colorInFill={true}
        className="rounded-lg bg-blue-100 p-2"
      >
        <Play />
      </IconContainer>
      <IconContainer
        size="lg"
        colorInFill={true}
        className="rounded-full bg-green-100 p-2"
      >
        <Check />
      </IconContainer>
      <IconContainer
        size="lg"
        colorInFill={true}
        className="rounded-lg bg-red-100 p-2"
      >
        <Heart />
      </IconContainer>
      <IconContainer
        size="lg"
        colorInFill={true}
        className="rounded-lg bg-yellow-100 p-2"
      >
        <Star />
      </IconContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "IconContainer with custom background colors and styling applied via className.",
      },
    },
  },
};

// Interactive Hover Effects
export const InteractiveHover: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconContainer
        size="lg"
        colorInFill={true}
        className="cursor-pointer rounded-lg p-2 transition-all duration-200 hover:scale-110 hover:bg-blue-100"
      >
        <Play />
      </IconContainer>
      <IconContainer
        size="lg"
        colorInFill={true}
        className="cursor-pointer rounded-lg p-2 transition-all duration-200 hover:scale-110 hover:bg-green-100"
      >
        <Heart />
      </IconContainer>
      <IconContainer
        size="lg"
        colorInFill={true}
        className="cursor-pointer rounded-lg p-2 transition-all duration-200 hover:scale-110 hover:bg-red-100"
      >
        <Settings />
      </IconContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive IconContainers with hover effects and transitions.",
      },
    },
  },
};

// Size Comparison
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm">xs</div>
        <IconContainer size="xs" colorInFill={true}>
          <Home />
        </IconContainer>
        <div className="text-xs text-gray-600">12px × 12px</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm">sm</div>
        <IconContainer size="sm" colorInFill={true}>
          <Home />
        </IconContainer>
        <div className="text-xs text-gray-600">18px × 18px</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm">md</div>
        <IconContainer size="md" colorInFill={true}>
          <Home />
        </IconContainer>
        <div className="text-xs text-gray-600">20px × 20px</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm">lg</div>
        <IconContainer size="lg" colorInFill={true}>
          <Home />
        </IconContainer>
        <div className="text-xs text-gray-600">24px × 24px</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm">xl</div>
        <IconContainer size="xl" colorInFill={true}>
          <Home />
        </IconContainer>
        <div className="text-xs text-gray-600">32px × 32px</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm">2xl</div>
        <IconContainer size="2xl" colorInFill={true}>
          <Home />
        </IconContainer>
        <div className="text-xs text-gray-600">36px × 36px</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Detailed size comparison with exact pixel dimensions.",
      },
    },
  },
};

// Text Color Examples
export const TextColorExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm">Default</div>
        <IconContainer size="lg" colorInFill={false}>
          <User />
        </IconContainer>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm">Blue</div>
        <IconContainer size="lg" colorInFill={false} className="text-blue-600">
          <User />
        </IconContainer>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm">Green</div>
        <IconContainer size="lg" colorInFill={false} className="text-green-600">
          <User />
        </IconContainer>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm">Red</div>
        <IconContainer size="lg" colorInFill={false} className="text-red-600">
          <User />
        </IconContainer>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 text-sm">Purple</div>
        <IconContainer
          size="lg"
          colorInFill={false}
          className="text-purple-600"
        >
          <User />
        </IconContainer>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples of using text colors when colorInFill is false.",
      },
    },
  },
};

// Usage in Cards
export const UsageInCards: Story = {
  render: () => (
    <div className="grid max-w-md grid-cols-2 gap-4">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <IconContainer
            size="lg"
            colorInFill={true}
            className="rounded-lg bg-blue-100 p-2"
          >
            <Play />
          </IconContainer>
          <div>
            <div className="font-medium">Media Player</div>
            <div className="text-sm text-gray-600">Click to play video</div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <IconContainer
            size="lg"
            colorInFill={true}
            className="rounded-lg bg-green-100 p-2"
          >
            <Settings />
          </IconContainer>
          <div>
            <div className="font-medium">Settings</div>
            <div className="text-sm text-gray-600">
              Configure your preferences
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of IconContainer used in card layouts with descriptive text.",
      },
    },
  },
};

// Dark Mode
export const DarkMode: Story = {
  render: () => (
    <div className="rounded-lg bg-gray-900 p-6">
      <div className="grid grid-cols-4 gap-4">
        <IconContainer size="md" colorInFill={true} className="text-white">
          <Play />
        </IconContainer>
        <IconContainer size="md" colorInFill={true} className="text-white">
          <Heart />
        </IconContainer>
        <IconContainer size="md" colorInFill={true} className="text-white">
          <Settings />
        </IconContainer>
        <IconContainer size="md" colorInFill={true} className="text-white">
          <Star />
        </IconContainer>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "IconContainer examples in dark mode with white text color.",
      },
    },
  },
};
