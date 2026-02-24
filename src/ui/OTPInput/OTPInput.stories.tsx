import type { Meta, StoryObj } from "@storybook/react";
import { OTPInput } from ".";

const meta: Meta<typeof OTPInput> = {
  title: "Common/OTPInput",
  component: OTPInput,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [4, 6, 8],
      description: "The number of OTP input slots",
    },
    separate: {
      control: "boolean",
      description: "Whether to show a separator between input groups",
    },
  },
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  args: {
    type: 4,
    separate: false,
  },
};

export const WithSeparator: Story = {
  args: {
    type: 4,
    separate: true,
  },
};

export const SixDigits: Story = {
  args: {
    type: 6,
    separate: false,
  },
};

export const SixDigitsWithSeparator: Story = {
  args: {
    type: 6,
    separate: true,
  },
};

export const EightDigits: Story = {
  args: {
    type: 8,
    separate: false,
  },
};

export const EightDigitsWithSeparator: Story = {
  args: {
    type: 8,
    separate: true,
  },
};

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 text-sm font-medium">4 Digits</h3>
        <OTPInput {...args} type={4} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">6 Digits</h3>
        <OTPInput {...args} type={6} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">8 Digits</h3>
        <OTPInput {...args} type={8} />
      </div>
    </div>
  ),
  args: {
    separate: true,
  },
};

export const AllSeparatorStates: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 text-sm font-medium">Without Separator</h3>
        <OTPInput {...args} separate={false} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">With Separator</h3>
        <OTPInput {...args} separate={true} />
      </div>
    </div>
  ),
  args: {
    type: 6,
  },
};
