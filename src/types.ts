export interface UINode {
  type: string;
  props?: Record<string, unknown>;
  children?: UINode[];
}

export interface CardPrimitiveProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export interface KeyValueItem {
  label: string;
  value: string;
}

export interface KeyValuePrimitiveProps {
  items?: KeyValueItem[];
}

export interface ButtonItem {
  label: string;
  variant?: "primary" | "secondary" | "outline";
  url?: string;
}

export interface ButtonGroupPrimitiveProps {
  buttons?: ButtonItem[];
}

export interface PrimitiveSchema {
  description: string;
  props: Record<string, unknown>;
  accepts_children: boolean;
  example: UINode;
}

export interface ComponentSchema {
  $schema: string;
  description: string;
  primitives: Record<string, PrimitiveSchema>;
  ui_tree_format: {
    description: string;
    schema: Record<string, unknown>;
  };
  full_example: UINode;
}
