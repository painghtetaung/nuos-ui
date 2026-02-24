import type { Meta, StoryObj } from "@storybook/react";
import { ProgressIndicator } from "./index";

const meta: Meta<typeof ProgressIndicator> = {
  title: "Common/ProgressIndicator",
  component: ProgressIndicator,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["bar", "circle"],
      description: "The visual style of the progress indicator",
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "The current progress value (0-100)",
    },
    max: {
      control: { type: "number", min: 1, max: 1000 },
      description: "The maximum value for progress calculation",
    },
    showPercentage: {
      control: "boolean",
      description: "Whether to display the percentage text",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A progress indicator component with bar and circle variants. Shows progress with percentage text positioned appropriately for each variant.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const Bar: Story = {
  args: {
    variant: "bar",
    value: 50,
    showPercentage: true,
  },
};

export const Circle: Story = {
  args: {
    variant: "circle",
    value: 50,
    showPercentage: true,
  },
};

export const BarWithoutPercentage: Story = {
  args: {
    variant: "bar",
    value: 75,
    showPercentage: false,
  },
};

export const CircleWithoutPercentage: Story = {
  args: {
    variant: "circle",
    value: 75,
    showPercentage: false,
  },
};

export const AllProgressValues: Story = {
  render: (args) => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Bar Progress</h3>
        <div className="space-y-4">
          <ProgressIndicator {...args} variant="bar" value={0} />
          <ProgressIndicator {...args} variant="bar" value={25} />
          <ProgressIndicator {...args} variant="bar" value={50} />
          <ProgressIndicator {...args} variant="bar" value={75} />
          <ProgressIndicator {...args} variant="bar" value={100} />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Circle Progress</h3>
        <div className="flex flex-wrap gap-6">
          <ProgressIndicator {...args} variant="circle" value={0} />
          <ProgressIndicator {...args} variant="circle" value={25} />
          <ProgressIndicator {...args} variant="circle" value={50} />
          <ProgressIndicator {...args} variant="circle" value={75} />
          <ProgressIndicator {...args} variant="circle" value={100} />
        </div>
      </div>
    </div>
  ),
  args: {
    showPercentage: true,
  },
};

export const Interactive: Story = {
  render: (args) => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Interactive Bar Progress</h3>
        <ProgressIndicator {...args} variant="bar" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Interactive Circle Progress
        </h3>
        <ProgressIndicator {...args} variant="circle" />
      </div>
    </div>
  ),
  args: {
    value: 65,
    showPercentage: true,
  },
};

export const UsageExamples: Story = {
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">File Upload Progress</h3>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              document.pdf
            </span>
            <span className="text-gray-500 dark:text-gray-400">3.2 MB</span>
          </div>
          <ProgressIndicator {...args} variant="bar" value={65} />
          <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>2.1 MB uploaded</span>
            <span>65%</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Task Completion</h3>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h4 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Task Progress
          </h4>
          <div className="flex items-center space-x-4">
            <ProgressIndicator {...args} variant="circle" value={80} />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Project Setup
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                4 of 5 tasks completed
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Form Progress</h3>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Profile Information
              </span>
              <span className="text-gray-900 dark:text-white">Step 2 of 4</span>
            </div>
            <ProgressIndicator {...args} variant="bar" value={50} />
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    showPercentage: true,
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="space-y-6 rounded-lg bg-gray-900 p-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">
          Bar Progress (Dark Mode)
        </h3>
        <div className="space-y-4">
          <ProgressIndicator {...args} variant="bar" value={25} />
          <ProgressIndicator {...args} variant="bar" value={50} />
          <ProgressIndicator {...args} variant="bar" value={75} />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">
          Circle Progress (Dark Mode)
        </h3>
        <div className="flex gap-6">
          <ProgressIndicator {...args} variant="circle" value={25} />
          <ProgressIndicator {...args} variant="circle" value={50} />
          <ProgressIndicator {...args} variant="circle" value={75} />
        </div>
      </div>
    </div>
  ),
  args: {
    showPercentage: true,
  },
};
