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
  external: ["react", "react-dom"],
  jsx: "automatic",
  esbuildOptions(options) {
    options.alias = {
      "@": path.resolve(import.meta.dirname, "src"),
    };
  },
});
