import { defineConfig } from "tsup";
import path from "node:path";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    schema: "src/schema.ts",
    "ui/index": "src/ui/index.ts",
    "design-tokens/design-tokens": "src/design-tokens/design-tokens.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react-hook-form",
    "@radix-ui/react-slot",
    "@radix-ui/react-label",
    "@radix-ui/react-checkbox",
    "@radix-ui/react-dialog",
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-popover",
    "@radix-ui/react-radio-group",
    "@radix-ui/react-select",
    "@radix-ui/react-separator",
    "@radix-ui/react-switch",
    "@radix-ui/react-tabs",
    "@radix-ui/react-toggle",
    "@radix-ui/react-tooltip",
    "@radix-ui/react-avatar",
    "@radix-ui/react-accordion",
    "@radix-ui/react-alert-dialog",
    "@radix-ui/react-context-menu",
    "@radix-ui/react-hover-card",
    "@radix-ui/react-progress",
    "@radix-ui/react-scroll-area",
    "@radix-ui/react-slider",
  ],
  jsx: "automatic",
  esbuildOptions(options) {
    options.alias = {
      "@": path.resolve(import.meta.dirname, "src"),
    };
  },
});
