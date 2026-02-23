import { zodToJsonSchema } from "zod-to-json-schema";
import { componentSchemas } from "./components";
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";

const outputPath = resolve(import.meta.dirname, "../../schema/component-schema.json");

const components: Record<string, any> = {};

for (const [name, schema] of Object.entries(componentSchemas)) {
  const jsonSchema = zodToJsonSchema(schema, {
    name,
    $refStrategy: "none",
  });
  components[name] = jsonSchema;
}

const output = {
  $schema: "Generative UI Component Schema",
  description:
    "Auto-generated from Zod schemas. Available UI components for composing chat UI. Each node has: type (string), props (object), children (array of nodes, optional).",
  components,
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");

console.log(`Generated component schema → ${outputPath}`);
console.log(`Components: ${Object.keys(components).join(", ")}`);
