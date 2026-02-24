import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchInput } from ".";

const withSearchParamDisplay = (Story: React.ComponentType) => {
  // Create a unique search state for each story instance
  const createSearchState = () => {
    let value: string | null = null;
    let listeners: ((value: string | null) => void)[] = [];

    return {
      getValue: () => value,
      setValue: (newValue: string | null) => {
        value = newValue;
        listeners.forEach((listener) => listener(newValue));
      },
      subscribe: (listener: (value: string | null) => void) => {
        listeners.push(listener);
        return () => {
          listeners = listeners.filter((l) => l !== listener);
        };
      },
    };
  };

  const searchState = createSearchState();

  const useQueryStateMock = () => {
    const [value, setValue] = useState<string | null>(null);

    const setValueWithTracking = (newValue: string | null) => {
      setValue(newValue);
      searchState.setValue(newValue);
    };

    return [value, setValueWithTracking] as const;
  };

  // Assign the mock to window for this story instance
  (window as any).useQueryState = useQueryStateMock;

  const [displayValue, setDisplayValue] = useState<string | null>(
    searchState.getValue(),
  );

  useState(() => {
    const unsubscribe = searchState.subscribe(setDisplayValue);
    return unsubscribe;
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md bg-gray-100 p-4">
        <p className="text-sm font-medium text-gray-700">
          Example URL with Search Parameter:
        </p>
        <p className="font-mono text-sm break-all text-gray-600">
          http://localhost:6006{displayValue ? `?search=${displayValue}` : ""}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {displayValue
            ? "The search parameter will be updated in the URL as you type"
            : "Type in the search box to see the URL parameter update"}
        </p>
      </div>
      <Story />
    </div>
  );
};

const meta: Meta<typeof SearchInput> = {
  title: "Common/SearchInput",
  component: SearchInput,
  decorators: [withSearchParamDisplay],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {},
};

export const DebouncedSearchWithParam: Story = {
  name: "Debounced Search with URL Param",
  args: {
    addToParam: true,
    debounceDelay: 300,
    placeholder: "Search items...",
  },
};

export const LocalOnlySearch: Story = {
  name: "Local Only Search without URL Param",
  args: {
    addToParam: false,
    debounceDelay: 300,
    placeholder: "Local filter...",
  },
};
