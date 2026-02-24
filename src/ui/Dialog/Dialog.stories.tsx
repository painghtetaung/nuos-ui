import type { Meta, StoryObj } from "@storybook/react";
import { SaveIcon, TrashIcon, XIcon } from "lucide-react";
import { useState } from "react";
import Dialog from "./index";

const meta: Meta<typeof Dialog> = {
  title: "Common/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls dialog visibility",
    },
    showCloseButton: {
      control: "boolean",
      description: "Show/hide close button",
    },
    children: {
      control: "text",
      description: "Dialog content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Dialog Stories
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Open Dialog
        </button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          children={
            <div className="py-8 text-center">
              <div className="mb-4 text-6xl">👋</div>
              <h3 className="mb-2 text-xl font-semibold">Hello World!</h3>
              <p className="text-gray-600">
                This is a simple dialog with flexible width that adapts to
                content.
              </p>
            </div>
          }
          primaryAction={{
            label: "Confirm",
            onClick: () => {
              console.log("Confirmed");
              setOpen(false);
            },
            variant: "primary",
          }}
        />
      </div>
    );
  },
};

export const SingleAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Show Success Dialog
        </button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          children={
            <div className="py-8 text-center">
              <div className="mb-4 text-6xl">✅</div>
              <h3 className="mb-2 text-xl font-semibold">Success!</h3>
              <p className="text-gray-600">
                Your action has been completed successfully.
              </p>
            </div>
          }
          primaryAction={{
            label: "OK",
            onClick: () => {
              console.log("OK clicked");
              setOpen(false);
            },
            variant: "primary",
          }}
        />
      </div>
    );
  },
};

export const TwoActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Show Save Dialog
        </button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          children={
            <div className="py-8 text-center">
              <div className="mb-4 text-6xl">💾</div>
              <h3 className="mb-2 text-xl font-semibold">Save Changes</h3>
              <p className="mb-4 text-gray-600">
                You have unsaved changes. What would you like to do?
              </p>
              <div className="rounded border border-yellow-200 bg-yellow-50 p-3">
                <p className="text-sm text-yellow-800">
                  ⚠️ Your changes will be lost if you don't save them.
                </p>
              </div>
            </div>
          }
          primaryAction={{
            label: "Save",
            onClick: async () => {
              console.log("Saving...");
              await new Promise((resolve) => setTimeout(resolve, 1000));
              console.log("Saved!");
              setOpen(false);
            },
            variant: "primary",
            prefix: <SaveIcon className="h-4 w-4" />,
          }}
          secondaryAction={{
            label: "Discard",
            onClick: () => {
              console.log("Discarded");
              setOpen(false);
            },
            variant: "outline",
          }}
        />
      </div>
    );
  },
};

export const ThreeActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Show Delete Dialog
        </button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          children={
            <div className="py-8 text-center">
              <div className="mb-4 text-6xl">🗑️</div>
              <h3 className="mb-2 text-xl font-semibold">Delete Item</h3>
              <p className="mb-6 text-gray-600">
                This item will be permanently deleted. Choose your action:
              </p>
              <div className="space-y-4">
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <h4 className="mb-2 font-medium text-red-900">
                    ⚠️ Permanent Deletion
                  </h4>
                  <p className="text-sm text-red-700">
                    This action cannot be undone. The item will be permanently
                    removed from your account.
                  </p>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h4 className="mb-2 font-medium text-blue-900">
                    🗑️ Move to Trash
                  </h4>
                  <p className="text-sm text-blue-700">
                    The item will be moved to trash and can be restored later if
                    needed.
                  </p>
                </div>
              </div>
            </div>
          }
          primaryAction={{
            label: "Delete Forever",
            onClick: async () => {
              console.log("Deleting forever...");
              await new Promise((resolve) => setTimeout(resolve, 1500));
              console.log("Deleted!");
              setOpen(false);
            },
            variant: "destructive",
            prefix: <TrashIcon className="h-4 w-4" />,
          }}
          secondaryAction={{
            label: "Move to Trash",
            onClick: () => {
              console.log("Moved to trash");
              setOpen(false);
            },
            variant: "secondary",
          }}
          tertiaryAction={{
            label: "Cancel",
            onClick: () => {
              console.log("Cancelled");
              setOpen(false);
            },
            variant: "outline",
            prefix: <XIcon className="h-4 w-4" />,
          }}
        />
      </div>
    );
  },
};

// Interactive Stories
export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState<
      "single" | "double" | "triple"
    >("single");

    const SingleDialog = () => (
      <Dialog
        open={open && dialogType === "single"}
        onOpenChange={setOpen}
        children={
          <div className="py-8 text-center">
            <div className="mb-4 text-6xl">👋</div>
            <h3 className="mb-2 text-xl font-semibold">Hello World!</h3>
            <p className="text-gray-600">This is a single action dialog.</p>
          </div>
        }
        primaryAction={{
          label: "Confirm",
          onClick: () => {
            console.log("Primary action clicked");
            setOpen(false);
          },
          variant: "primary",
        }}
      />
    );

    const DoubleDialog = () => (
      <Dialog
        open={open && dialogType === "double"}
        onOpenChange={setOpen}
        children={
          <div className="py-8 text-center">
            <div className="mb-4 text-6xl">💾</div>
            <h3 className="mb-2 text-xl font-semibold">Save Changes</h3>
            <p className="text-gray-600">
              You have unsaved changes. What would you like to do?
            </p>
          </div>
        }
        primaryAction={{
          label: "Save",
          onClick: async () => {
            console.log("Save clicked");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setOpen(false);
          },
          variant: "primary",
        }}
        secondaryAction={{
          label: "Discard",
          onClick: () => {
            console.log("Discard clicked");
            setOpen(false);
          },
          variant: "outline",
        }}
      />
    );

    const TripleDialog = () => (
      <Dialog
        open={open && dialogType === "triple"}
        onOpenChange={setOpen}
        children={
          <div className="py-8 text-center">
            <div className="mb-4 text-6xl">🗑️</div>
            <h3 className="mb-2 text-xl font-semibold">Delete Item</h3>
            <p className="text-gray-600">
              This item will be permanently deleted. Choose your action:
            </p>
          </div>
        }
        primaryAction={{
          label: "Delete Forever",
          onClick: async () => {
            console.log("Delete forever clicked");
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setOpen(false);
          },
          variant: "destructive",
        }}
        secondaryAction={{
          label: "Move to Trash",
          onClick: () => {
            console.log("Move to trash clicked");
            setOpen(false);
          },
          variant: "secondary",
        }}
        tertiaryAction={{
          label: "Cancel",
          onClick: () => {
            console.log("Cancel clicked");
            setOpen(false);
          },
          variant: "outline",
        }}
      />
    );

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => {
              setDialogType("single");
              setOpen(true);
            }}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Single Action
          </button>
          <button
            onClick={() => {
              setDialogType("double");
              setOpen(true);
            }}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Double Action
          </button>
          <button
            onClick={() => {
              setDialogType("triple");
              setOpen(true);
            }}
            className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
          >
            Triple Action
          </button>
        </div>
        <SingleDialog />
        <DoubleDialog />
        <TripleDialog />
      </div>
    );
  },
};

// Custom Styling Stories
export const CustomStyled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
        >
          Show Custom Styled Dialog
        </button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          className="border-2 border-indigo-200 shadow-2xl"
          footerClassName="bg-indigo-50 p-4 rounded-b-lg"
          children={
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded bg-gray-50 p-4">
                  <h4 className="font-medium">Feature 1</h4>
                  <p className="text-sm text-gray-600">Custom content area</p>
                </div>
                <div className="rounded bg-gray-50 p-4">
                  <h4 className="font-medium">Feature 2</h4>
                  <p className="text-sm text-gray-600">Another content area</p>
                </div>
              </div>
              <div className="rounded-lg border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
                <p className="text-sm text-indigo-800">
                  This is a custom content area with gradient background and
                  custom styling.
                </p>
              </div>
            </div>
          }
          primaryAction={{
            label: "Custom Primary",
            onClick: () => {
              console.log("Custom primary action");
              setOpen(false);
            },
            variant: "primary",
            size: "lg",
            className: "bg-indigo-600 hover:bg-indigo-700",
          }}
          secondaryAction={{
            label: "Custom Secondary",
            onClick: () => {
              console.log("Custom secondary action");
              setOpen(false);
            },
            variant: "outline",
            size: "lg",
            className: "border-indigo-300 text-indigo-700 hover:bg-indigo-50",
          }}
        />
      </div>
    );
  },
};

// Loading States Story
export const LoadingStates: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
        >
          Show Loading Dialog
        </button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          children={
            <div className="py-8 text-center">
              <div className="mb-4 text-6xl">⏳</div>
              <h3 className="mb-2 text-xl font-semibold">Processing...</h3>
              <p className="text-gray-600">
                This dialog demonstrates loading states for async actions.
              </p>
            </div>
          }
          primaryAction={{
            label: "Process Data",
            onClick: async () => {
              console.log("Processing...");
              await new Promise((resolve) => setTimeout(resolve, 2000));
              console.log("Processed!");
              setOpen(false);
            },
            variant: "primary",
          }}
          secondaryAction={{
            label: "Cancel",
            onClick: () => {
              console.log("Cancelled");
              setOpen(false);
            },
            variant: "outline",
          }}
        />
      </div>
    );
  },
};

// Form Content Story
export const FormContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
        >
          Show Form Dialog
        </button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          children={
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter your message"
                />
              </div>
            </div>
          }
          primaryAction={{
            label: "Submit",
            onClick: () => {
              console.log("Form submitted");
              setOpen(false);
            },
            variant: "primary",
          }}
          secondaryAction={{
            label: "Cancel",
            onClick: () => {
              console.log("Form cancelled");
              setOpen(false);
            },
            variant: "outline",
          }}
        />
      </div>
    );
  },
};
