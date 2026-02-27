import { z } from "zod";
import { uiNodeSchema } from "./ui-node";

export const toggleSchema = z
  .object({
    type: z.literal("toggle"),
    props: z
      .object({
        active: z.boolean().optional().describe("Whether the toggle is pressed"),
        shape: z
          .enum(["rectangle", "rounded"])
          .optional()
          .describe("Toggle shape. Defaults to 'rectangle'"),
        style: z
          .enum(["ghost", "outline", "soft"])
          .optional()
          .describe("Visual style. Defaults to 'soft'"),
        size: z.enum(["sm", "md", "lg"]).optional().describe("Toggle size. Defaults to 'sm'"),
        disabled: z.boolean().optional(),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional().describe("Toggle label / content"),
  })
  .describe("A pressable toggle button");

export const sliderSchema = z
  .object({
    type: z.literal("slider"),
    props: z
      .object({
        defaultValue: z
          .union([z.number(), z.array(z.number())])
          .optional()
          .describe("Initial value or range [min, max]"),
        min: z.number().optional().describe("Minimum value. Defaults to 0"),
        max: z.number().optional().describe("Maximum value. Defaults to 100"),
        step: z.number().optional().describe("Step increment"),
        disabled: z.boolean().optional(),
      })
      .optional(),
  })
  .describe("A range slider input");

export const searchInputSchema = z
  .object({
    type: z.literal("search-input"),
    props: z.object({
      searchKey: z.string().describe("URL query param key for the search value"),
      placeholder: z
        .string()
        .optional()
        .describe("Placeholder text. Defaults to 'Search by...'"),
      debounceDelay: z
        .number()
        .optional()
        .describe("Debounce delay in ms. Defaults to 500"),
      variant: z
        .enum(["ghost", "outline"])
        .optional()
        .describe("Input style variant"),
      disabled: z.boolean().optional(),
    }),
  })
  .describe("A search input with debounced query param binding");

export const iconButtonSchema = z
  .object({
    type: z.literal("icon-button"),
    props: z.object({
      icon: z.string().describe("Icon name (resolved by the renderer)"),
      variant: z
        .enum([
          "primary", "secondary", "destructive", "outline",
          "ghost", "soft", "ai-filled", "ai-outline", "glass",
        ])
        .optional()
        .describe("Button style. Defaults to 'primary'"),
      size: z
        .enum(["xs", "sm", "md", "lg"])
        .optional()
        .describe("Button size. Defaults to 'sm'"),
      active: z.boolean().optional().describe("Active / pressed state"),
      rounded: z.boolean().optional().describe("Fully round button"),
      disabled: z.boolean().optional(),
    }),
  })
  .describe("An icon-only action button");

export const linkButtonSchema = z
  .object({
    type: z.literal("link-button"),
    props: z.object({
      href: z.string().describe("Link URL"),
      children: z.string().optional().describe("Link text"),
    }),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("A button styled as a navigation link");

export const buttonLinkSchema = z
  .object({
    type: z.literal("button-link"),
    props: z
      .object({
        children: z.string().optional().describe("Link text"),
        variant: z
          .enum(["link", "text-link", "error"])
          .optional()
          .describe("Link style. Defaults to 'link'"),
        href: z.string().optional().describe("Link URL"),
        disabled: z.boolean().optional(),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("An inline text link styled as a button");

export const selectHoverSchema = z
  .object({
    type: z.literal("select-hover"),
    props: z.object({
      options: z
        .array(
          z.object({
            label: z.string().describe("Display text"),
            value: z.string().describe("Option value"),
          }),
        )
        .describe("Array of selectable options"),
      placeholder: z
        .string()
        .optional()
        .describe("Placeholder text. Defaults to 'Select an option'"),
      value: z.string().optional().describe("Currently selected value"),
    }),
  })
  .describe("A hover-activated select dropdown");
