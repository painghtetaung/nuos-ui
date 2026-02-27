import { z } from "zod";
import { uiNodeSchema } from "./ui-node";

export const badgeSchema = z
  .object({
    type: z.literal("badge"),
    props: z
      .object({
        children: z.string().optional().describe("Badge text"),
        type: z
          .enum([
            "primary-hard",
            "primary-soft",
            "destructive-hard",
            "destructive-soft",
            "secondary-hard",
            "secondary-soft",
          ])
          .optional()
          .describe("Badge style. Defaults to 'primary-hard'"),
        size: z.enum(["sm", "md"]).optional().describe("Badge size. Defaults to 'sm'"),
        rounded: z.boolean().optional().describe("Fully rounded pill shape"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("A small status badge / label");

export const tagSchema = z
  .object({
    type: z.literal("tag"),
    props: z.object({
      label: z.string().describe("Tag text"),
      variant: z
        .enum(["primary", "secondary", "destructive"])
        .optional()
        .describe("Tag color variant. Defaults to 'primary'"),
    }),
  })
  .describe("A colored tag / pill");

export const chipSchema = z
  .object({
    type: z.literal("chip"),
    props: z.object({
      label: z.string().describe("Chip text"),
      type: z
        .enum(["rounded", "rectangle"])
        .optional()
        .describe("Chip shape. Defaults to 'rounded'"),
      color: z
        .enum([
          "slate", "red", "orange", "amber", "yellow", "lime", "green",
          "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet",
          "purple", "fuchsia", "pink", "rose",
        ])
        .optional()
        .describe("Chip color. Defaults to 'slate'"),
      dot: z.boolean().optional().describe("Show a colored dot indicator"),
      avatar: z.string().optional().describe("Avatar image URL shown inside the chip"),
    }),
  })
  .describe("A compact chip element with optional color dot or avatar");

export const alertSchema = z
  .object({
    type: z.literal("alert"),
    props: z
      .object({
        variant: z
          .enum(["default", "secondary", "destructive"])
          .optional()
          .describe("Alert style. Defaults to 'default'"),
        title: z.string().optional().describe("Alert heading"),
        description: z.string().optional().describe("Alert body text"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("An alert / notice banner");

export const skeletonSchema = z
  .object({
    type: z.literal("skeleton"),
    props: z
      .object({
        className: z.string().optional().describe("Tailwind classes to control width/height, e.g. 'h-4 w-[250px]'"),
      })
      .optional(),
  })
  .describe("A loading placeholder skeleton");

export const progressIndicatorSchema = z
  .object({
    type: z.literal("progress-indicator"),
    props: z.object({
      value: z.number().describe("Current progress value"),
      max: z.number().optional().describe("Maximum value. Defaults to 100"),
      showPercentage: z.boolean().optional().describe("Show percentage text. Defaults to true"),
      variant: z
        .enum(["bar", "circle"])
        .optional()
        .describe("Display style. Defaults to 'bar'"),
    }),
  })
  .describe("A progress bar or circular progress indicator");
