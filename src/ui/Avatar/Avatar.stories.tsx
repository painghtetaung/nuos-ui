import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from ".";

const meta: Meta<typeof Avatar> = {
  title: "Common/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Avatar component for displaying user profile pictures, initials, or icons with optional status indicators.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["image", "text", "placeholder"],
      description:
        "The variant of the avatar - determines how content is displayed",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text" },
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
      description: "Size of the avatar using design system tokens",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    status: {
      control: "select",
      options: ["active", "inactive", undefined],
      description:
        "Status indicator of the avatar (green dot for active, gray for inactive)",
      table: {
        type: { summary: "string | undefined" },
      },
    },
    fallback: {
      control: "text",
      description:
        "Fallback text to show when image fails to load or for text variant",
      table: {
        type: { summary: "string" },
      },
    },
    imgsrc: {
      control: "text",
      description:
        "Source URL for the avatar image (required for image variant)",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    variant: "text",
    fallback: "L",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Default avatar with text variant showing user initials.",
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    variant: "image",
    imgsrc: "https://github.com/shadcn.png",
    fallback: "CN",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Avatar with image source. Falls back to initials if image fails to load.",
      },
    },
  },
};

export const WithStatus: Story = {
  args: {
    variant: "image",
    imgsrc: "https://github.com/shadcn.png",
    fallback: "CN",
    size: "md",
    status: "active",
  },
  parameters: {
    docs: {
      description: {
        story: "Avatar with status indicator showing online/offline state.",
      },
    },
  },
};

// Icon variant is not supported in the current API; removed

export const Placeholder: Story = {
  args: {
    variant: "placeholder",
    fallback: "EM",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Placeholder avatar state with fallback content.",
      },
    },
  },
};

export const WithBorder: Story = {
  args: {
    variant: "text",
    fallback: "L",
    size: "md",
    className:
      "border border-[var(--border-width-unit-border-width-sm)] border-stroke-inverse-slate-02",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Avatar with custom border using design system border width tokens.",
      },
    },
  },
};

export const SizeVariations: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar variant="text" fallback="XS" size="xs" />
        <span className="text-text-light text-xs">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar variant="text" fallback="SM" size="sm" />
        <span className="text-text-light text-xs">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar variant="text" fallback="MD" size="md" />
        <span className="text-text-light text-xs">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar variant="text" fallback="LG" size="lg" />
        <span className="text-text-light text-xs">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar variant="text" fallback="XL" size="xl" />
        <span className="text-text-light text-xs">xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar variant="text" fallback="2X" size="2xl" />
        <span className="text-text-light text-xs">2xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar variant="text" fallback="3X" size="3xl" />
        <span className="text-text-light text-xs">3xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar variant="text" fallback="4X" size="4xl" />
        <span className="text-text-light text-xs">4xl</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar variant="text" fallback="5X" size="5xl" />
        <span className="text-text-light text-xs">5xl</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available avatar sizes using design system tokens (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl).",
      },
    },
  },
};

export const StatusVariations: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          variant="image"
          imgsrc="https://github.com/shadcn.png"
          fallback="CN"
          size="md"
          status="active"
        />
        <span className="text-text-light text-xs">Active</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          variant="image"
          imgsrc="https://github.com/shadcn.png"
          fallback="CN"
          size="md"
          status="inactive"
        />
        <span className="text-text-light text-xs">Inactive</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          variant="image"
          imgsrc="https://github.com/shadcn.png"
          fallback="CN"
          size="md"
        />
        <span className="text-text-light text-xs">No Status</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatar status variations showing active (green), inactive (gray), and no status states.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Avatar
          variant="image"
          imgsrc="https://github.com/shadcn.png"
          fallback="CN"
          size="md"
        />
        <span className="text-text-light text-xs">Image</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar variant="text" fallback="L" size="md" />
        <span className="text-text-light text-xs">Text</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar variant="placeholder" fallback="EM" size="md" />
        <span className="text-text-light text-xs">Placeholder</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All avatar variants showing different content types: image, text initials, empty state, and custom icon.",
      },
    },
  },
};

export const Playground: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Avatar {...args} />
      <div className="text-text-light max-w-xs text-center text-sm">
        <p>
          Use the controls below to experiment with different avatar
          configurations.
        </p>
        <p className="mt-1">
          Try different variants, sizes, and status combinations.
        </p>
      </div>
    </div>
  ),
  args: {
    variant: "text",
    fallback: "JD",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test different avatar configurations. Use the controls panel to modify properties.",
      },
    },
  },
};
