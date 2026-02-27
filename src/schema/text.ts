import { z } from "zod";
import { uiNodeSchema } from "./ui-node";

export const textSchema = z
  .object({
    type: z.literal("text"),
    props: z
      .object({
        children: z.string().optional().describe("Text content"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("A paragraph of text");

export const titleSchema = z
  .object({
    type: z.literal("title"),
    props: z
      .object({
        children: z.string().optional().describe("Heading text"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("A heading / title element");

export const labelSchema = z
  .object({
    type: z.literal("label"),
    props: z
      .object({
        children: z.string().optional().describe("Label text"),
        htmlFor: z.string().optional().describe("ID of the form element this label is for"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("A form label element");
