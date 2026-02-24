import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  ExternalLink,
  Mail,
  Settings,
  Star,
  Trash2,
  User,
} from "lucide-react";
import { ButtonLink } from "./index";

const meta: Meta<typeof ButtonLink> = {
  title: "Common/ButtonLink",
  component: ButtonLink,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The ButtonLink component is a versatile link component that combines the functionality of a button with navigation capabilities. It supports multiple variants, icons, and states.

## Features
- **Multiple Variants**: link (blue underlined), text-link (default text), and error (red text)
- **Icon Support**: Add prefix and suffix icons for enhanced visual communication
- **Accessibility**: Proper ARIA attributes and keyboard navigation support
- **Disabled State**: Visual and functional disabled state
- **Customizable**: Extends standard anchor tag props with additional styling options

## Usage
Use ButtonLink for navigation actions that should look like links but behave like buttons, such as "Learn more", "View details", or "Continue reading".
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["link", "text-link", "error"],
      description: "Visual variant of the button link",
      table: {
        defaultValue: { summary: "link" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button link is disabled",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    prefix: {
      control: false,
      description: "Icon or element to display before the text",
    },
    suffix: {
      control: false,
      description: "Icon or element to display after the text",
    },
    asChild: {
      control: { type: "boolean" },
      description: "Render as a child component using Radix Slot",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: { type: "text" },
      description: "Text content of the button link",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground for the ButtonLink component. Use the controls panel to experiment with different variants, states, and configurations.
 */
export const Playground: Story = {
  args: {
    children: "Click me",
    variant: "link",
    disabled: false,
    asChild: false,
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-4">
        <ButtonLink
          variant={args.variant}
          disabled={args.disabled}
          asChild={args.asChild}
          prefix={args.prefix ? <ChevronLeft className="size-4" /> : undefined}
          suffix={args.suffix ? <ChevronRight className="size-4" /> : undefined}
        >
          {args.children}
        </ButtonLink>
      </div>
      <p className="text-sm text-gray-600">
        Use the controls panel to modify the button link properties and see the
        changes in real-time.
      </p>
    </div>
  ),
  argTypes: {
    prefix: {
      control: { type: "boolean" },
      description: "Show prefix icon",
    },
    suffix: {
      control: { type: "boolean" },
      description: "Show suffix icon",
    },
  },
};

/**
 * Basic link variant - the default style with blue underlined text.
 */
export const Link: Story = {
  args: {
    children: "Learn more",
    variant: "link",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-6">
      <ButtonLink variant={args.variant} disabled={args.disabled}>
        {args.children}
      </ButtonLink>
      <p className="text-sm text-gray-600">
        Standard link variant with blue underlined text. Perfect for "Learn
        more" or "Read more" actions.
      </p>
    </div>
  ),
};

/**
 * Text link variant - appears as regular text but functions as a clickable link.
 */
export const TextLink: Story = {
  args: {
    children: "View details",
    variant: "text-link",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-6">
      <ButtonLink variant={args.variant} disabled={args.disabled}>
        {args.children}
      </ButtonLink>
      <p className="text-sm text-gray-600">
        Text link variant that blends seamlessly with regular text while
        maintaining link functionality.
      </p>
    </div>
  ),
};

/**
 * Error variant - used for destructive or error-related actions.
 */
export const Error: Story = {
  args: {
    children: "Delete account",
    variant: "error",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-6">
      <ButtonLink variant={args.variant} disabled={args.disabled}>
        {args.children}
      </ButtonLink>
      <p className="text-sm text-gray-600">
        Error variant with red text color, typically used for destructive
        actions or error states.
      </p>
    </div>
  ),
};

/**
 * ButtonLink with prefix icon - useful for navigation actions.
 */
export const WithPrefixIcon: Story = {
  args: {
    children: "Back to dashboard",
    variant: "link",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-6">
      <ButtonLink
        variant={args.variant}
        disabled={args.disabled}
        prefix={<ChevronLeft className="size-4" />}
      >
        {args.children}
      </ButtonLink>
      <p className="text-sm text-gray-600">
        Prefix icon helps indicate direction or action type. Common for
        navigation links.
      </p>
    </div>
  ),
};

/**
 * ButtonLink with suffix icon - commonly used for external links or "more" actions.
 */
export const WithSuffixIcon: Story = {
  args: {
    children: "External resource",
    variant: "link",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-6">
      <ButtonLink
        variant={args.variant}
        disabled={args.disabled}
        suffix={<ExternalLink className="size-4" />}
      >
        {args.children}
      </ButtonLink>
      <p className="text-sm text-gray-600">
        Suffix icon indicates the nature of the link, such as external
        navigation or additional actions.
      </p>
    </div>
  ),
};

/**
 * ButtonLink with both prefix and suffix icons for complex actions.
 */
export const WithBothIcons: Story = {
  args: {
    children: "Continue reading",
    variant: "link",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-6">
      <ButtonLink
        variant={args.variant}
        disabled={args.disabled}
        prefix={<ChevronLeft className="size-4" />}
        suffix={<ArrowRight className="size-4" />}
      >
        {args.children}
      </ButtonLink>
      <p className="text-sm text-gray-600">
        Both icons can provide additional context about the action, though use
        sparingly to avoid visual clutter.
      </p>
    </div>
  ),
};

/**
 * Disabled state - shows how the component appears when not interactive.
 */
export const Disabled: Story = {
  args: {
    children: "Unavailable action",
    variant: "link",
    disabled: true,
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-6">
      <ButtonLink variant={args.variant} disabled={args.disabled}>
        {args.children}
      </ButtonLink>
      <p className="text-sm text-gray-600">
        Disabled state removes interactivity and applies muted styling to
        indicate unavailability.
      </p>
    </div>
  ),
};

/**
 * Comprehensive overview of all ButtonLink variants and states in one view.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Link Variants</h3>
        <div className="flex flex-wrap gap-4">
          <ButtonLink variant="link">Basic Link</ButtonLink>
          <ButtonLink
            variant="link"
            prefix={<ChevronLeft className="size-4" />}
          >
            With Prefix
          </ButtonLink>
          <ButtonLink
            variant="link"
            suffix={<ExternalLink className="size-4" />}
          >
            With Suffix
          </ButtonLink>
          <ButtonLink
            variant="link"
            prefix={<ChevronLeft className="size-4" />}
            suffix={<ArrowRight className="size-4" />}
          >
            With Both
          </ButtonLink>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Text Link Variants
        </h3>
        <div className="flex flex-wrap gap-4">
          <ButtonLink variant="text-link">Basic Text Link</ButtonLink>
          <ButtonLink variant="text-link" prefix={<User className="size-4" />}>
            Profile
          </ButtonLink>
          <ButtonLink
            variant="text-link"
            suffix={<Settings className="size-4" />}
          >
            Settings
          </ButtonLink>
          <ButtonLink
            variant="text-link"
            prefix={<Mail className="size-4" />}
            suffix={<ArrowRight className="size-4" />}
          >
            Contact
          </ButtonLink>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Error Variants</h3>
        <div className="flex flex-wrap gap-4">
          <ButtonLink variant="error">Delete Item</ButtonLink>
          <ButtonLink variant="error" prefix={<Trash2 className="size-4" />}>
            Remove
          </ButtonLink>
          <ButtonLink
            variant="error"
            suffix={<ExternalLink className="size-4" />}
          >
            Report Issue
          </ButtonLink>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-900">Disabled States</h3>
        <div className="flex flex-wrap gap-4">
          <ButtonLink variant="link" disabled>
            Disabled Link
          </ButtonLink>
          <ButtonLink variant="text-link" disabled>
            Disabled Text
          </ButtonLink>
          <ButtonLink variant="error" disabled>
            Disabled Error
          </ButtonLink>
        </div>
      </div>
    </div>
  ),
};

/**
 * Real-world examples showing ButtonLink in common UI patterns and contexts.
 */
export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Navigation Example */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Navigation Context
        </h3>
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ButtonLink
                variant="text-link"
                prefix={<ChevronLeft className="size-4" />}
              >
                Back to Dashboard
              </ButtonLink>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-600">User Settings</span>
            </div>
            <ButtonLink
              variant="link"
              suffix={<ExternalLink className="size-4" />}
            >
              Help Documentation
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Article/Content Example */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-900">Content Context</h3>
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="mb-4 text-gray-700">
            This is a sample article content. You can learn more about our
            features and how they can help your business grow.
          </p>
          <div className="flex items-center gap-4">
            <ButtonLink
              variant="link"
              suffix={<ArrowRight className="size-4" />}
            >
              Continue reading
            </ButtonLink>
            <ButtonLink
              variant="text-link"
              suffix={<Download className="size-4" />}
            >
              Download PDF
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* User Actions Example */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-900">User Actions</h3>
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ButtonLink
                variant="text-link"
                prefix={<Edit className="size-4" />}
              >
                Edit Profile
              </ButtonLink>
              <ButtonLink
                variant="text-link"
                prefix={<Settings className="size-4" />}
              >
                Preferences
              </ButtonLink>
            </div>
            <ButtonLink variant="error" prefix={<Trash2 className="size-4" />}>
              Delete Account
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Form Context Example */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-900">Form Context</h3>
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <ButtonLink variant="link">Forgot password?</ButtonLink>
            <ButtonLink
              variant="text-link"
              suffix={<Star className="size-4" />}
            >
              Terms of Service
            </ButtonLink>
            <ButtonLink
              variant="text-link"
              suffix={<Star className="size-4" />}
            >
              Privacy Policy
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  ),
};
