import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { Option } from "./index";
import { MultiSelect } from "./index";

const meta: Meta<typeof MultiSelect> = {
  title: "Common/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A multi-select dropdown component with optional create functionality. Supports selecting multiple options from a list and creating new options on the fly.",
      },
    },
  },
  argTypes: {
    options: {
      description: "Array of options to display in the dropdown",
      control: "object",
    },
    selected: {
      description: "Array of selected option values",
      control: "object",
    },
    onChange: {
      description: "Callback function called when selection changes",
      action: "changed",
    },
    placeholder: {
      description: "Placeholder text when no items are selected",
      control: "text",
    },
    createConfig: {
      description: "Configuration for creating new options",
      control: "object",
    },
    disabled: {
      description: "Whether the component is disabled",
      control: "boolean",
    },
    className: {
      description: "Additional CSS classes to apply",
      control: "text",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

// Sample data
const sampleOptions: Option[] = [
  { label: "React", value: "react" },
  { label: "Vue.js", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "nextjs" },
  { label: "Nuxt.js", value: "nuxtjs" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Node.js", value: "nodejs" },
];

const skillsOptions: Option[] = [
  { label: "Frontend Development", value: "frontend" },
  { label: "Backend Development", value: "backend" },
  { label: "Full Stack Development", value: "fullstack" },
  { label: "UI/UX Design", value: "uiux" },
  { label: "Data Science", value: "datascience" },
  { label: "DevOps", value: "devops" },
  { label: "Mobile Development", value: "mobile" },
  { label: "Machine Learning", value: "ml" },
];

// Wrapper component for state management in stories
const MultiSelectWrapper = (args: any) => {
  const [selected, setSelected] = useState<string[]>(args.selected || []);

  return (
    <div className="w-80">
      <MultiSelect
        {...args}
        selected={selected}
        onChange={(newSelected) => {
          setSelected(newSelected);
          args.onChange?.(newSelected);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: MultiSelectWrapper,
  args: {
    options: sampleOptions,
    selected: [],
    placeholder: "Select technologies...",
  },
};

export const WithPreselected: Story = {
  render: MultiSelectWrapper,
  args: {
    options: sampleOptions,
    selected: ["react", "typescript", "nodejs"],
    placeholder: "Select technologies...",
  },
};

export const Creatable: Story = {
  render: MultiSelectWrapper,
  args: {
    options: skillsOptions,
    selected: [],
    createConfig: {
      enabled: true,
      action: async (inputValue) => {
        console.log("Creating new option:", inputValue);
      },
    },
    placeholder: "Select or create skills...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `creatable` is true, users can create new options by typing and pressing Enter.",
      },
    },
  },
};

export const CreatableWithPreselected: Story = {
  render: MultiSelectWrapper,
  args: {
    options: skillsOptions,
    selected: ["frontend", "uiux"],
    createConfig: {
      enabled: true,
      action: async (inputValue) => {
        console.log("Creating new option:", inputValue);
      },
    },
    placeholder: "Select or create skills...",
  },
};

export const Disabled: Story = {
  render: MultiSelectWrapper,
  args: {
    options: sampleOptions,
    selected: ["react", "vue"],
    disabled: true,
    placeholder: "Select technologies...",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled state prevents all interactions with the component.",
      },
    },
  },
};

export const EmptyOptions: Story = {
  render: MultiSelectWrapper,
  args: {
    options: [],
    selected: [],
    placeholder: "No options available...",
  },
  parameters: {
    docs: {
      description: {
        story: "Component behavior when no options are provided.",
      },
    },
  },
};

export const EmptyOptionsCreatable: Story = {
  render: MultiSelectWrapper,
  args: {
    options: [],
    selected: [],
    createConfig: {
      enabled: true,
      action: async (inputValue) => {
        console.log("Creating new option:", inputValue);
      },
    },
    placeholder: "Start typing to create...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "With no options but creatable enabled, users can still create new items.",
      },
    },
  },
};

export const LargeList: Story = {
  render: MultiSelectWrapper,
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option-${i + 1}`,
    })),
    selected: [],
    placeholder: "Select from many options...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Component with a large number of options to test scrolling behavior.",
      },
    },
  },
};

export const CustomStyling: Story = {
  render: MultiSelectWrapper,
  args: {
    options: sampleOptions,
    selected: ["react"],
    placeholder: "Select technologies...",
    className: "border-2 border-blue-500",
  },
  parameters: {
    docs: {
      description: {
        story: "Custom styling can be applied using the className prop.",
      },
    },
  },
};

// Interactive playground
export const Playground: Story = {
  render: MultiSelectWrapper,
  args: {
    options: sampleOptions,
    selected: [],
    placeholder: "Select technologies...",
    createConfig: {
      enabled: false,
      action: async (inputValue) => {
        console.log("Creating new option:", inputValue);
      },
    },
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all component props and behaviors.",
      },
    },
  },
};
