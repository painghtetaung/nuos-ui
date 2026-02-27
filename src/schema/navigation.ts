import { z } from "zod";
import { uiNodeSchema } from "./ui-node";

export const breadcrumbSchema = z
  .object({
    type: z.literal("breadcrumb"),
    props: z.object({
      items: z
        .array(
          z.object({
            label: z.string().describe("Breadcrumb text"),
            href: z.string().optional().describe("Navigation URL"),
            disabled: z.boolean().optional(),
          }),
        )
        .describe("Ordered list of breadcrumb segments"),
    }),
  })
  .describe("A breadcrumb navigation trail");

export const tooltipSchema = z
  .object({
    type: z.literal("tooltip"),
    props: z.object({
      content: z.string().describe("Tooltip text"),
      position: z
        .enum([
          "top", "top-center", "top-left", "top-right",
          "bottom", "bottom-left", "bottom-center", "bottom-right",
          "left", "right",
        ])
        .optional()
        .describe("Tooltip placement"),
      withArrow: z.boolean().optional().describe("Show an arrow pointer"),
    }),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("The trigger element the tooltip wraps"),
  })
  .describe("A tooltip that appears on hover over its child element");
