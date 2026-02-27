import { z } from "zod";
import { uiNodeSchema } from "./ui-node";

export const gridSchema = z
  .object({
    type: z.literal("grid"),
    props: z
      .object({
        className: z
          .string()
          .optional()
          .describe("Tailwind grid classes, e.g. 'grid-cols-2 gap-4'"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional().describe("Grid items"),
  })
  .describe("A CSS grid layout container");

export const accordionSchema = z
  .object({
    type: z.literal("accordion"),
    props: z
      .object({
        type: z
          .enum(["single", "multiple"])
          .optional()
          .describe("Allow one or multiple items open. Defaults to 'single'"),
        collapsible: z.boolean().optional().describe("Allow collapsing all items"),
        defaultValue: z
          .union([z.string(), z.array(z.string())])
          .optional()
          .describe("Initially open item value(s)"),
      })
      .optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Compose with accordion-item children"),
  })
  .describe("A collapsible accordion container");

export const accordionItemSchema = z
  .object({
    type: z.literal("accordion-item"),
    props: z.object({
      value: z.string().describe("Unique item identifier"),
    }),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Place accordion-trigger and accordion-content inside"),
  })
  .describe("A single accordion section");

export const accordionTriggerSchema = z
  .object({
    type: z.literal("accordion-trigger"),
    props: z
      .object({
        children: z.string().optional().describe("Trigger label text"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("Clickable header that toggles an accordion-item");

export const accordionContentSchema = z
  .object({
    type: z.literal("accordion-content"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Content revealed when the item is open"),
  })
  .describe("Collapsible content area of an accordion-item");

export const tabsSchema = z
  .object({
    type: z.literal("tabs"),
    props: z.object({
      defaultActiveTab: z.string().describe("Value of the initially active tab"),
      tabs: z
        .array(
          z.object({
            value: z.string().describe("Unique tab identifier"),
            label: z.string().describe("Tab label text"),
            count: z.number().optional().describe("Badge count on the tab"),
            notification: z.boolean().optional().describe("Show notification dot"),
          }),
        )
        .describe("Tab definitions"),
      tabSmall: z.boolean().optional().describe("Use compact tab styling"),
      showContent: z
        .boolean()
        .optional()
        .describe("Show tab content panels. Defaults to true"),
    }),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Tab content panels (one per tab, in order)"),
  })
  .describe("A tabbed interface with switchable content panels");

export const wrapperCardSchema = z
  .object({
    type: z.literal("wrapper-card"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Card body content"),
  })
  .describe("A simple card wrapper with default padding and border");

export const gradientContainerSchema = z
  .object({
    type: z.literal("gradient-container"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Content inside the gradient container"),
  })
  .describe("A container with a gradient background");

export const carouselSchema = z
  .object({
    type: z.literal("carousel"),
    props: z
      .object({
        orientation: z
          .enum(["horizontal", "vertical"])
          .optional()
          .describe("Scroll direction. Defaults to 'horizontal'"),
      })
      .optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Place a carousel-content inside"),
  })
  .describe("A scrollable carousel container");

export const carouselContentSchema = z
  .object({
    type: z.literal("carousel-content"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Compose with carousel-item children"),
  })
  .describe("Content track of a carousel");

export const carouselItemSchema = z
  .object({
    type: z.literal("carousel-item"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Content for this slide"),
  })
  .describe("A single slide inside a carousel");
