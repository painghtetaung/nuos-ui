export interface UINode {
  type: string;
  props?: Record<string, unknown>;
  children?: UINode[];
}

export interface PrimitiveSchema {
  description: string;
  props: Record<string, unknown>;
  accepts_children: boolean;
  example?: UINode;
}

export interface ComponentSchema {
  $schema: string;
  description: string;
  components: Record<string, PrimitiveSchema>;
  ui_tree_format: {
    description: string;
    schema: Record<string, unknown>;
  };
  full_example: UINode;
}
