import "@/styles.css";
import type { Meta, StoryObj } from "@storybook/react";
import { FileInput } from "./index";

const meta: Meta<typeof FileInput> = {
  title: "Common/FileInput",
  component: FileInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  args: {
    label: "Upload file",
  },
};

export const Disabled: Story = {
  args: {
    label: "Upload file",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Upload file",
    "aria-invalid": true,
  },
};
