import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Media } from "./index";

const meta: Meta<typeof Media> = {
  title: "Common/Media",
  component: Media,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The Media component is a versatile component for displaying images and videos with consistent aspect ratios and interactive controls.

## Features
- **Multiple Aspect Ratios**: Support for 1:1, 16:9, 9:16, 4:3, and 3:4 aspect ratios
- **Image & Video Support**: Handles both static images and video content
- **Interactive Controls**: Play/pause functionality for videos with hover states
- **Loading States**: Built-in loading and error states for images
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Responsive Design**: Adapts to different screen sizes while maintaining aspect ratios

## Usage
Use Media for displaying visual content that needs consistent sizing and interactive behavior, such as thumbnails, hero images, or video previews.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: { type: "text" },
      description: "Source URL for the image or video",
    },
    alt: {
      control: { type: "text" },
      description: "Alt text for accessibility",
    },
    type: {
      control: { type: "select" },
      options: ["image", "video"],
      description: "Type of media content",
    },
    aspectRatio: {
      control: { type: "select" },
      options: ["1:1", "16:9", "9:16", "4:3", "3:4"],
      description: "Aspect ratio of the media container",
    },
    showPlayButton: {
      control: { type: "boolean" },
      description: "Whether to show play button for videos",
    },
    isPlaying: {
      control: { type: "boolean" },
      description: "Whether the video is currently playing",
    },
    loading: {
      control: { type: "select" },
      options: ["lazy", "eager"],
      description: "Loading strategy for images",
    },
    objectFit: {
      control: { type: "select" },
      options: ["cover", "contain", "fill", "scale-down", "none"],
      description: "How the media should fit within its container",
    },
    rounded: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl", "2xl", "full"],
      description: "Border radius of the media container",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive playground for the Media component. Use the controls panel to experiment with different configurations.
 */
export const Playground: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
    alt: "Sample image",
    type: "image",
    aspectRatio: "16:9",
    showPlayButton: true,
    isPlaying: false,
    loading: "lazy",
    objectFit: "cover",
    rounded: "md",
  },
  render: (args) => (
    <div className="flex flex-col gap-4 p-6">
      <div className="max-w-md">
        <Media
          src={
            args.src ||
            "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
          }
          {...args}
        />
      </div>
      <p className="text-sm text-gray-600">
        Use the controls panel to modify the media properties and see the
        changes in real-time.
      </p>
    </div>
  ),
};

/**
 * Image with different aspect ratios as shown in the design system.
 */
export const ImageAspectRatios: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Image Aspect Ratios
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">
            1:1 (Square)
          </span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop"
            alt="Square image"
            type="image"
            aspectRatio="1:1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">16:9 (Wide)</span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop"
            alt="Wide image"
            type="image"
            aspectRatio="16:9"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">
            9:16 (Portrait)
          </span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=711&fit=crop"
            alt="Portrait image"
            type="image"
            aspectRatio="9:16"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">
            4:3 (Standard)
          </span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=450&fit=crop"
            alt="Standard image"
            type="image"
            aspectRatio="4:3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">
            3:4 (Portrait)
          </span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=450&h=600&fit=crop"
            alt="Portrait standard image"
            type="image"
            aspectRatio="3:4"
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * Video with different aspect ratios and play button functionality.
 */
export const VideoAspectRatios: Story = {
  render: () => {
    const [playingStates, setPlayingStates] = useState<Record<string, boolean>>(
      {},
    );

    const handlePlay = (id: string) => {
      setPlayingStates((prev) => ({ ...prev, [id]: true }));
    };

    const handlePause = (id: string) => {
      setPlayingStates((prev) => ({ ...prev, [id]: false }));
    };

    return (
      <div className="flex flex-col gap-6 p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Video Aspect Ratios
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">
              1:1 (Square)
            </span>
            <Media
              src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
              alt="Square video"
              type="video"
              aspectRatio="1:1"
              isPlaying={playingStates.square}
              onPlay={() => handlePlay("square")}
              onPause={() => handlePause("square")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">
              16:9 (Wide)
            </span>
            <Media
              src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
              alt="Wide video"
              type="video"
              aspectRatio="16:9"
              isPlaying={playingStates.wide}
              onPlay={() => handlePlay("wide")}
              onPause={() => handlePause("wide")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">
              9:16 (Portrait)
            </span>
            <Media
              src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
              alt="Portrait video"
              type="video"
              aspectRatio="9:16"
              isPlaying={playingStates.portrait}
              onPlay={() => handlePlay("portrait")}
              onPause={() => handlePause("portrait")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">
              4:3 (Standard)
            </span>
            <Media
              src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
              alt="Standard video"
              type="video"
              aspectRatio="4:3"
              isPlaying={playingStates.standard}
              onPlay={() => handlePlay("standard")}
              onPause={() => handlePause("standard")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">
              3:4 (Portrait)
            </span>
            <Media
              src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
              alt="Portrait standard video"
              type="video"
              aspectRatio="3:4"
              isPlaying={playingStates.portraitStandard}
              onPlay={() => handlePlay("portraitStandard")}
              onPause={() => handlePause("portraitStandard")}
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Different object fit options for media content.
 */
export const ObjectFitOptions: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Object Fit Options
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">Cover</span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
            alt="Cover example"
            type="image"
            aspectRatio="4:3"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">Contain</span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
            alt="Contain example"
            type="image"
            aspectRatio="4:3"
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">Fill</span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
            alt="Fill example"
            type="image"
            aspectRatio="4:3"
            objectFit="fill"
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * Different border radius options for media containers.
 */
export const BorderRadiusOptions: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Border Radius Options
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">None</span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop"
            alt="No radius"
            type="image"
            aspectRatio="1:1"
            rounded="none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">Small</span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop"
            alt="Small radius"
            type="image"
            aspectRatio="1:1"
            rounded="sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">Medium</span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop"
            alt="Medium radius"
            type="image"
            aspectRatio="1:1"
            rounded="md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">Large</span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop"
            alt="Large radius"
            type="image"
            aspectRatio="1:1"
            rounded="lg"
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * Loading and error states for media content.
 */
export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Loading & Error States
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">
            Loading State
          </span>
          <Media
            src="https://slow-loading-image.com/image.jpg"
            alt="Loading image"
            type="image"
            aspectRatio="4:3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">Error State</span>
          <Media
            src="https://invalid-url.com/image.jpg"
            alt="Error image"
            type="image"
            aspectRatio="4:3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-600">
            Success State
          </span>
          <Media
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
            alt="Success image"
            type="image"
            aspectRatio="4:3"
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * Real-world examples showing Media component in common UI patterns.
 */
export const RealWorldExamples: Story = {
  render: () => {
    const [playingVideo, setPlayingVideo] = useState(false);

    return (
      <div className="flex flex-col gap-8 p-6">
        {/* Hero Section Example */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
          <div className="relative">
            <Media
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop"
              alt="Hero image"
              type="image"
              aspectRatio="16:9"
              rounded="lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-lg bg-white/90 px-6 py-4 text-center shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome to Our Platform
                </h2>
                <p className="text-gray-600">
                  Discover amazing features and capabilities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid Example */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-900">Gallery Grid</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Media
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop"
              alt="Gallery item 1"
              type="image"
              aspectRatio="1:1"
              rounded="md"
            />
            <Media
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop"
              alt="Gallery item 2"
              type="image"
              aspectRatio="1:1"
              rounded="md"
            />
            <Media
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop"
              alt="Gallery item 3"
              type="image"
              aspectRatio="1:1"
              rounded="md"
            />
            <Media
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop"
              alt="Gallery item 4"
              type="image"
              aspectRatio="1:1"
              rounded="md"
            />
          </div>
        </div>

        {/* Video Player Example */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-900">Video Player</h3>
          <div className="max-w-2xl">
            <Media
              src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
              alt="Sample video"
              type="video"
              aspectRatio="16:9"
              rounded="lg"
              isPlaying={playingVideo}
              onPlay={() => setPlayingVideo(true)}
              onPause={() => setPlayingVideo(false)}
            />
          </div>
        </div>

        {/* Card with Media Example */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Card with Media
          </h3>
          <div className="max-w-sm overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <Media
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop"
              alt="Card image"
              type="image"
              aspectRatio="16:9"
              rounded="none"
            />
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">Card Title</h4>
              <p className="text-sm text-gray-600">
                This is a sample card with media content.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
