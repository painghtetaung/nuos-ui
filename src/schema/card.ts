import { z } from "zod";
import { uiNodeSchema } from "./ui-node";

export const cardSchema = z
  .object({
    type: z.literal("card"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Compose with card-header, card-content, card-footer"),
  })
  .describe("Container card");

export const cardHeaderSchema = z
  .object({
    type: z.literal("card-header"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Place card-title and card-description inside"),
  })
  .describe("Header section of a card");

export const cardTitleSchema = z
  .object({
    type: z.literal("card-title"),
    props: z
      .object({
        children: z.string().optional().describe("Title text"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("Title inside a card-header");

export const cardDescriptionSchema = z
  .object({
    type: z.literal("card-description"),
    props: z
      .object({
        children: z.string().optional().describe("Description text"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("Description text inside a card-header");

export const cardContentSchema = z
  .object({
    type: z.literal("card-content"),
    props: z.object({}).optional(),
    children: z.array(uiNodeSchema).optional().describe("Main content area"),
  })
  .describe("Main content area of a card");

export const cardFooterSchema = z
  .object({
    type: z.literal("card-footer"),
    props: z.object({}).optional(),
    children: z.array(uiNodeSchema).optional().describe("Footer area, typically for actions"),
  })
  .describe("Footer section of a card");
