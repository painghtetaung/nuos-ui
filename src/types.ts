export interface UINode {
  type: string;
  props?: Record<string, unknown>;
  children?: UINode[];
}

export interface ComponentSchema {
  $schema: string;
  description: string;
  components: Record<string, unknown>;
}
