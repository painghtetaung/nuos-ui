import type { ComponentSchema, UINode } from "./types";
import schemaJson from "../schema/component-schema.json";

/**
 * The full component schema describing all available primitives,
 * their props, and examples. Use this in your backend to inform the
 * AI about available UI components.
 */
export const componentSchema: ComponentSchema = schemaJson as ComponentSchema;

/**
 * Returns just the components section of the schema.
 */
export function getPrimitiveSchemas() {
  return componentSchema.components;
}

/**
 * Returns a full example UI tree that demonstrates all primitives.
 */
export function getFullExample(): UINode {
  return componentSchema.full_example;
}

export type { ComponentSchema, UINode } from "./types";
