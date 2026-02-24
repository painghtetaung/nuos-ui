import { z } from "zod";
import { uiNodeSchema } from "./ui-node";

export const formSchema = z
  .object({
    type: z.literal("form"),
    props: z.object({
      id: z.string().describe("Unique form ID"),
    }),
    children: z.array(uiNodeSchema).optional().describe("Form field components"),
  })
  .describe("A form container. Wrap form fields inside.");

export const inputFieldSchema = z
  .object({
    type: z.literal("input-field"),
    props: z.object({
      name: z.string().describe("Field name (maps to form data key)"),
      label: z.string().optional().describe("Label text above the input"),
      placeholder: z.string().optional().describe("Placeholder text"),
      type: z.enum(["text", "email", "number", "url", "search", "tel"]).optional().describe("Input type. Defaults to 'text'"),
      required: z.boolean().optional().describe("Whether the field is required"),
      disabled: z.boolean().optional(),
    }),
  })
  .describe("A text input field inside a form");

export const passwordFieldSchema = z
  .object({
    type: z.literal("password-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      label: z.string().optional().describe("Label text"),
      placeholder: z.string().optional(),
    }),
  })
  .describe("A password input field with show/hide toggle");

export const textareaFieldSchema = z
  .object({
    type: z.literal("textarea-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      label: z.string().optional().describe("Label text"),
      placeholder: z.string().optional(),
      rows: z.number().optional().describe("Number of visible rows"),
    }),
  })
  .describe("A multi-line text input field");

export const selectFieldSchema = z
  .object({
    type: z.literal("select-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      label: z.string().optional().describe("Label text"),
      placeholder: z.string().optional(),
      options: z
        .array(z.object({
          label: z.string().describe("Display text"),
          value: z.string().describe("Option value"),
        }))
        .describe("Array of selectable options"),
      required: z.boolean().optional(),
    }),
  })
  .describe("A dropdown select field");

export const checkboxFieldSchema = z
  .object({
    type: z.literal("checkbox-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      label: z.string().optional().describe("Checkbox label text"),
    }),
  })
  .describe("A checkbox field");

export const radioFieldSchema = z
  .object({
    type: z.literal("radio-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      label: z.string().optional().describe("Group label"),
      options: z
        .array(z.object({
          label: z.string().describe("Option label"),
          value: z.string().describe("Option value"),
        }))
        .describe("Array of radio options"),
    }),
  })
  .describe("A radio button group field");

export const switchFieldSchema = z
  .object({
    type: z.literal("switch-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      label: z.string().optional().describe("Switch label"),
    }),
  })
  .describe("A toggle switch field");

export const dateFieldSchema = z
  .object({
    type: z.literal("date-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      label: z.string().optional().describe("Label text"),
      placeholder: z.string().optional(),
      disablePast: z.boolean().optional().describe("Disable past dates"),
      required: z.boolean().optional(),
    }),
  })
  .describe("A date picker field");

export const timeFieldSchema = z
  .object({
    type: z.literal("time-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      label: z.string().optional().describe("Label text"),
    }),
  })
  .describe("A time picker field");

export const comboboxFieldSchema = z
  .object({
    type: z.literal("combobox-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      label: z.string().optional().describe("Label text"),
      placeholder: z.string().optional(),
      options: z
        .array(z.object({
          label: z.string().describe("Display text"),
          value: z.string().describe("Option value"),
        }))
        .describe("Array of searchable options"),
    }),
  })
  .describe("A searchable combobox/autocomplete field");

export const multiSelectFieldSchema = z
  .object({
    type: z.literal("multi-select-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      label: z.string().optional().describe("Label text"),
      placeholder: z.string().optional(),
      options: z
        .array(z.object({
          label: z.string().describe("Display text"),
          value: z.string().describe("Option value"),
        }))
        .describe("Array of options for multi-selection"),
    }),
  })
  .describe("A multi-select dropdown field");

export const otpFieldSchema = z
  .object({
    type: z.literal("otp-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      maxLength: z.number().optional().describe("Number of OTP digits. Defaults to 6"),
    }),
  })
  .describe("An OTP (one-time password) input field");

export const fileUploadFieldSchema = z
  .object({
    type: z.literal("file-upload-field"),
    props: z.object({
      name: z.string().describe("Field name"),
      label: z.string().optional().describe("Label text"),
      isMultiple: z.boolean().optional().describe("Allow multiple files"),
      maxFiles: z.number().optional().describe("Maximum number of files"),
    }),
  })
  .describe("A file upload field with drag-and-drop");
