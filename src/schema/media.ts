import { z } from "zod";

export const avatarSchema = z
  .object({
    type: z.literal("avatar"),
    props: z.object({
      variant: z
        .enum(["image", "text", "placeholder"])
        .describe("Avatar display mode"),
      fallback: z.string().describe("Fallback text (initials) when image is unavailable"),
      imgsrc: z.string().optional().describe("Image URL (required when variant is 'image')"),
      size: z
        .enum(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"])
        .optional()
        .describe("Avatar size. Defaults to 'md'"),
      status: z
        .enum(["active", "inactive"])
        .optional()
        .describe("Online status indicator"),
    }),
  })
  .describe("A user avatar displaying an image, initials, or placeholder");

export const avatarListItemSchema = z
  .object({
    type: z.literal("avatar-list-item"),
    props: z.object({
      avatar: z.string().describe("Avatar image URL"),
      name: z.string().describe("Display name"),
      email: z.string().describe("Email address"),
      isMe: z.boolean().optional().describe("Highlight as current user"),
    }),
  })
  .describe("An avatar with name and email, typically used in lists");

export const mediaSchema = z
  .object({
    type: z.literal("media"),
    props: z.object({
      src: z.string().describe("Media source URL"),
      alt: z.string().optional().describe("Alt text for images"),
      type: z
        .enum(["image", "video"])
        .optional()
        .describe("Media type. Defaults to 'image'"),
      aspectRatio: z
        .enum(["1:1", "16:9", "9:16", "4:3", "3:4"])
        .optional()
        .describe("Fixed aspect ratio"),
      objectFit: z
        .enum(["cover", "contain", "fill", "scale-down", "none"])
        .optional()
        .describe("How the media fills its container. Defaults to 'cover'"),
      rounded: z
        .enum(["none", "sm", "md", "lg", "xl", "2xl", "full"])
        .optional()
        .describe("Border radius"),
      loading: z
        .enum(["lazy", "eager"])
        .optional()
        .describe("Loading strategy. Defaults to 'lazy'"),
    }),
  })
  .describe("An image or video media element");
