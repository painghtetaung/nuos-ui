import type { ComponentType, ReactNode } from "react";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "./ui/Card";
import { Button } from "./ui/Button";
import type { UINode } from "./types";

const defaultComponents: Record<string, ComponentType<any>> = {
  card: Card,
  "card-header": CardHeader,
  "card-title": CardTitle,
  "card-description": CardDescription,
  "card-content": CardContent,
  "card-footer": CardFooter,
  button: Button,
};

let registry: Record<string, ComponentType<any>> = { ...defaultComponents };

/**
 * Register additional components or override defaults.
 */
export function registerPrimitives(components: Record<string, ComponentType<any>>) {
  registry = { ...registry, ...components };
}

export function isUINode(data: unknown): data is UINode {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    typeof (data as any).type === "string" &&
    (data as any).type in registry
  );
}

export function getAvailablePrimitives(): string[] {
  return Object.keys(registry);
}

/**
 * Recursive renderer that composes a UINode tree into React elements.
 */
export default function UIRenderer({ node }: { node: UINode }) {
  const Component = registry[node.type];
  if (!Component) return null;

  const childElements: ReactNode = node.children?.map((child, i) => (
    <UIRenderer key={i} node={child} />
  ));

  return <Component {...(node.props ?? {})}>{childElements}</Component>;
}
