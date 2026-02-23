import { z } from "zod";
import { uiNodeSchema } from "./ui-node";

export const buttonSchema = z
  .object({
    type: z.literal("button"),
    props: z
      .object({
        label: z.string().optional().describe("Button text"),
        variant: z
          .enum(["primary", "secondary", "outline", "destructive", "ghost", "soft"])
          .optional()
          .describe("Button style. Defaults to 'primary'"),
        size: z.enum(["sm", "md", "lg"]).optional().describe("Button size. Defaults to 'md'"),
        url: z.string().optional().describe("URL to open when clicked"),
        disabled: z.boolean().optional().describe("Whether the button is disabled"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("An action button");
