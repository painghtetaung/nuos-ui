import type { ComponentSchema } from "./types";
import schemaJson from "../schema/component-schema.json";

/**
 * The full component schema auto-generated from Zod definitions.
 * Use this in your backend to inform the AI about available UI components.
 */
export const componentSchema: ComponentSchema = schemaJson as ComponentSchema;

/**
 * Returns just the components section of the schema.
 */
export function getComponentSchemas() {
  return componentSchema.components;
}

export type { ComponentSchema, UINode } from "./types";
