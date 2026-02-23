import type { ComponentType, ReactNode } from "react";
import { CardPrimitive, KeyValuePrimitive, ButtonGroupPrimitive } from "./primitives";
import type { UINode } from "./types";

const defaultPrimitives: Record<string, ComponentType<any>> = {
  card: CardPrimitive,
  "key-value": KeyValuePrimitive,
  "button-group": ButtonGroupPrimitive,
};

let registeredPrimitives: Record<string, ComponentType<any>> = {
  ...defaultPrimitives,
};

/**
 * Register additional primitives or override defaults.
 * Call this at app startup to extend the renderer with custom components.
 */
export function registerPrimitives(
  primitives: Record<string, ComponentType<any>>,
) {
  registeredPrimitives = { ...registeredPrimitives, ...primitives };
}

/**
 * Check if unknown data is a valid UINode that can be rendered.
 */
export function isUINode(data: unknown): data is UINode {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    typeof (data as any).type === "string" &&
    (data as any).type in registeredPrimitives
  );
}

/**
 * Returns the list of currently registered primitive type names.
 */
export function getAvailablePrimitives(): string[] {
  return Object.keys(registeredPrimitives);
}

/**
 * Recursive renderer that composes a UINode tree into React elements.
 */
export default function UIRenderer({ node }: { node: UINode }) {
  const Component = registeredPrimitives[node.type];
  if (!Component) return null;

  const childElements: ReactNode = node.children?.map((child, i) => (
    <UIRenderer key={i} node={child} />
  ));

  return <Component {...(node.props ?? {})}>{childElements}</Component>;
}
