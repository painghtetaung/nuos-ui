import { z } from "zod";
import { uiNodeSchema } from "./ui-node";

// ─── Sheet ───────────────────────────────────────────────────────────────────

export const sheetSchema = z
  .object({
    type: z.literal("sheet"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Compose with sheet-trigger and sheet-content"),
  })
  .describe("A slide-out panel overlay");

export const sheetTriggerSchema = z
  .object({
    type: z.literal("sheet-trigger"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("The element that opens the sheet"),
  })
  .describe("Trigger element that opens a sheet");

export const sheetContentSchema = z
  .object({
    type: z.literal("sheet-content"),
    props: z
      .object({
        side: z
          .enum(["top", "right", "bottom", "left"])
          .optional()
          .describe("Slide-in direction. Defaults to 'right'"),
        showCloseButton: z.boolean().optional().describe("Show close button. Defaults to true"),
      })
      .optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Sheet body content"),
  })
  .describe("Content panel of a sheet");

export const sheetHeaderSchema = z
  .object({
    type: z.literal("sheet-header"),
    props: z.object({}).optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("Header section of a sheet");

export const sheetFooterSchema = z
  .object({
    type: z.literal("sheet-footer"),
    props: z.object({}).optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("Footer section of a sheet");

export const sheetTitleSchema = z
  .object({
    type: z.literal("sheet-title"),
    props: z
      .object({
        children: z.string().optional().describe("Title text"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("Title inside a sheet-header");

export const sheetDescriptionSchema = z
  .object({
    type: z.literal("sheet-description"),
    props: z
      .object({
        children: z.string().optional().describe("Description text"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("Description text inside a sheet-header");

// ─── Dropdown Menu ───────────────────────────────────────────────────────────

export const dropdownMenuSchema = z
  .object({
    type: z.literal("dropdown-menu"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Compose with dropdown-menu-trigger and dropdown-menu-content"),
  })
  .describe("A dropdown menu container");

export const dropdownMenuTriggerSchema = z
  .object({
    type: z.literal("dropdown-menu-trigger"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("The element that opens the dropdown"),
  })
  .describe("Trigger element that opens a dropdown menu");

export const dropdownMenuContentSchema = z
  .object({
    type: z.literal("dropdown-menu-content"),
    props: z
      .object({
        side: z.enum(["top", "right", "bottom", "left"]).optional(),
        align: z.enum(["start", "center", "end"]).optional(),
      })
      .optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Menu items"),
  })
  .describe("Content panel of a dropdown menu");

export const dropdownMenuItemSchema = z
  .object({
    type: z.literal("dropdown-menu-item"),
    props: z
      .object({
        children: z.string().optional().describe("Menu item text"),
        variant: z
          .enum(["default", "destructive"])
          .optional()
          .describe("Item style. Defaults to 'default'"),
        disabled: z.boolean().optional(),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("A single item inside a dropdown menu");

export const dropdownMenuSeparatorSchema = z
  .object({
    type: z.literal("dropdown-menu-separator"),
    props: z.object({}).optional(),
  })
  .describe("A visual separator between dropdown menu items");

export const dropdownMenuLabelSchema = z
  .object({
    type: z.literal("dropdown-menu-label"),
    props: z
      .object({
        children: z.string().optional().describe("Label text"),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("A non-interactive label inside a dropdown menu");

// ─── Popover ─────────────────────────────────────────────────────────────────

export const popoverSchema = z
  .object({
    type: z.literal("popover"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Compose with popover-trigger and popover-content"),
  })
  .describe("A popover overlay container");

export const popoverTriggerSchema = z
  .object({
    type: z.literal("popover-trigger"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("The element that opens the popover"),
  })
  .describe("Trigger element that opens a popover");

export const popoverContentSchema = z
  .object({
    type: z.literal("popover-content"),
    props: z
      .object({
        align: z
          .enum(["start", "center", "end"])
          .optional()
          .describe("Alignment relative to trigger. Defaults to 'center'"),
        sideOffset: z.number().optional().describe("Offset from trigger in px. Defaults to 4"),
      })
      .optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Popover body content"),
  })
  .describe("Content panel of a popover");

// ─── Context Menu ────────────────────────────────────────────────────────────

export const contextMenuSchema = z
  .object({
    type: z.literal("context-menu"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Compose with context-menu-trigger and context-menu-content"),
  })
  .describe("A right-click context menu container");

export const contextMenuTriggerSchema = z
  .object({
    type: z.literal("context-menu-trigger"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("The element that triggers the context menu on right-click"),
  })
  .describe("Trigger area for a context menu");

export const contextMenuContentSchema = z
  .object({
    type: z.literal("context-menu-content"),
    props: z.object({}).optional(),
    children: z
      .array(uiNodeSchema)
      .optional()
      .describe("Menu items"),
  })
  .describe("Content panel of a context menu");

export const contextMenuItemSchema = z
  .object({
    type: z.literal("context-menu-item"),
    props: z
      .object({
        children: z.string().optional().describe("Menu item text"),
        variant: z
          .enum(["default", "destructive"])
          .optional()
          .describe("Item style. Defaults to 'default'"),
        disabled: z.boolean().optional(),
      })
      .optional(),
    children: z.array(uiNodeSchema).optional(),
  })
  .describe("A single item inside a context menu");

export const contextMenuSeparatorSchema = z
  .object({
    type: z.literal("context-menu-separator"),
    props: z.object({}).optional(),
  })
  .describe("A visual separator between context menu items");
