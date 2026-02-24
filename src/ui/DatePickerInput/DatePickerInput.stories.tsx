import "@/styles.css";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePickerInput } from "./index";

const meta: Meta<typeof DatePickerInput> = {
  title: "Common/DatePickerInput",
  component: DatePickerInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePickerInput>;

// Wrapper component to handle state
const DatePickerWithState = (args: any) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return <DatePickerInput date={date} setDate={setDate} {...args} />;
};

export const Default: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    placeholder: "Select a date",
  },
};

export const WithInitialDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <DatePickerInput
        date={date}
        setDate={setDate}
        placeholder="Select a date"
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    placeholder: "Select a date",
    disabled: true,
  },
};

export const WithError: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    placeholder: "Select a date",
    "aria-invalid": true,
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    placeholder: "Choose your birthday",
  },
};

export const DisablePast: Story = {
  render: (args) => <DatePickerWithState {...args} disablePast />,
  args: {
    placeholder: "No past dates allowed",
  },
};
