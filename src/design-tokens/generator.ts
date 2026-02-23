import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load token files
const coreTokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, "core/value.json"), "utf8")
);
const componentTokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, "component/value.json"), "utf8")
);
const lightModeTokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, "system/light mode.json"), "utf8")
);
const darkModeTokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, "system/dark mode.json"), "utf8")
);

// Helper function to convert camelCase to kebab-case
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

// Types
type Json = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject {
  [key: string]: Json;
}
type JsonArray = Json[];

type FlattenedTokens = Record<string, string>;

// Replacement mappings for token names (similar to index.ts)
const REPLACEMENT_MAPPINGS: Record<string, Record<string, string>> = {
  typography: {
    "typography-font-size": "text",
    "typography-line-height": "leading",
    "typography-font-weight": "font-weight",
    "typography-tracking": "tracking",
  },
  unit: {
    "unit-spacing": "spacing-unit",
    "unit-corner-radius": "radius-unit-corner-radius",
    "unit-opacity": "opacity-unit",
    "unit-stroke": "stroke-unit",
    "unit-border-weight": "border-width-unit-border-width",
  },
  opacity: {
    "opacity-inverse": "color-opacity-inverse",
    "opacity-static": "color-opacity-static",
  },
  button: {
    button: "color-button",
  },
  breadcrumb: {
    breadcrumb: "color-breadcrumb",
  },
  badge: {
    badge: "color-badge",
  },
  chip: {
    chip: "color-chip",
  },
  switch: {
    switch: "color-switch",
  },
  checkbox: {
    checkbox: "color-checkbox",
  },
  input: {
    input: "color-input",
  },
  toggle: {
    toggle: "color-toggle",
  },
  tab: {
    tab: "color-tab",
  },
  effect: {
    effect: "color-effect",
  },
  dropdown: {
    dropdown: "color-dropdown",
  },
  chatBubble: {
    chatBubble: "color-chatBubble",
  },
  mainMenuItem: {
    mainMenuItem: "color-mainMenuItem",
  },
  workspaceNavigation: {
    workspaceNavigation: "color-workspaceNavigation",
  },
  tag: {
    tag: "color-tag",
  },
  card: {
    card: "color-card",
  },
  toast: {
    toast: "color-toast",
  },
  meeting: {
    meeting: "color-meeting",
  },
  toolToggle: {
    toolToggle: "color-toolToggle",
  },
  noticeBox: {
    noticeBox: "color-noticeBox",
  },
  audioProgress: {
    audioProgress: "color-audioProgress",
  },
  menu: {
    menu: "color-menu",
  },
  navigation: {
    navigation: "color-navigation",
  },
  utility: {
    utility: "color-utility",
  },
  check: {
    check: "color-check",
  },
  chat: {
    chat: "color-chat",
  },
  notification_card: {
    notification_card: "color-notificationCard",
  },
  comment: {
    comment: "color-comment",
  },
  filter: {
    filter: "color-filter",
  },
  data: {
    data: "color-data",
  },
  table: {
    table: "color-table",
  },
};

// Helper function to apply replacement mappings
function applyReplacementMappings(key: string): string {
  // Extract category from key (first part before first dash)
  const category = key.split("-")[0];

  if (REPLACEMENT_MAPPINGS[category]) {
    return Object.entries(REPLACEMENT_MAPPINGS[category]).reduce(
      (name, [search, replace]) => name.replace(search, replace),
      key
    );
  }

  return key;
}

// Convert a reference string like "{color.blue.100}" to a CSS var name
function referenceToCssVar(refString: string): string {
  if (
    typeof refString === "string" &&
    refString.startsWith("{") &&
    refString.endsWith("}")
  ) {
    const path = refString.slice(1, -1).split(".");
    const kebab = path.map((p) => toKebabCase(p)).join("-");

    return `var(--${applyReplacementMappings(kebab)})`;
  }
  return refString;
}

// Helper function to convert opacity rem values to opacity percentage/decimal
function convertOpacityValue(value: string, key: string): string {
  // Check if this is an opacity token
  if (key.includes("opacity") && typeof value === "string") {
    // Extract numeric value and unit
    const match = value.match(/^([\d.]+)(rem|px)$/i);
    if (match) {
      const numericValue = parseFloat(match[1]);
      const unit = match[2].toLowerCase();

      let pxValue: number;
      if (unit === "rem") {
        // Convert rem to px (assuming 1rem = 16px)
        pxValue = numericValue * 16;
      } else {
        // Already in px
        pxValue = numericValue;
      }

      // Convert px to opacity value (0-1 range)
      // px / 100 = opacity value
      const opacityValue = pxValue / 100;

      return opacityValue.toString();
    }
  }
  return value;
}

// Decide the emitted CSS value: if it's a reference, emit var(--...), otherwise emit the raw/resolved value
function emitCssValue(
  rawValue: unknown,
  _tokensContext: JsonObject,
  key?: string
): string {
  if (
    typeof rawValue === "string" &&
    rawValue.startsWith("{") &&
    rawValue.endsWith("}")
  ) {
    return referenceToCssVar(rawValue);
  }
  const stringValue = String(rawValue);
  // Convert opacity values from rem/px to decimal
  if (key) {
    return convertOpacityValue(stringValue, key);
  }
  return stringValue;
}

// Helper function to flatten nested objects
function flattenTokens(
  obj: unknown,
  prefix = "",
  tokens: FlattenedTokens = {}
): FlattenedTokens {
  if (!obj || typeof obj !== "object") return tokens;

  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const newKey = prefix ? `${prefix}-${toKebabCase(key)}` : toKebabCase(key);

    const mappedKey = applyReplacementMappings(newKey);

    if (
      value &&
      typeof value === "object" &&
      "value" in (value as Record<string, unknown>)
    ) {
      // This is a token with a value
      tokens[mappedKey] = String(
        (value as Record<string, unknown>).value as string
      );
    } else if (value && typeof value === "object") {
      // This is a nested object
      flattenTokens(value, newKey, tokens);
    }
  }
  return tokens;
}

// Generate CSS variables (single @theme block like dist/css/tokens.css)
function generateCSSVariables(): string {
  let css = `/* Design Tokens CSS Variables */\n/* Generated from design tokens */\n\n@theme {\n`;

  // Process core tokens
  const coreFlattened = flattenTokens(coreTokens as JsonObject);
  for (const [key, value] of Object.entries(coreFlattened)) {
    const emitted = emitCssValue(value, coreTokens, key);

    css += `  --${key}: ${emitted};\n`;
  }

  // Process component tokens
  const componentFlattened = flattenTokens(componentTokens as JsonObject);
  for (const [key, value] of Object.entries(componentFlattened)) {
    const emitted = emitCssValue(
      value,
      { ...coreTokens, ...componentTokens },
      key
    );
    css += `  --${key}: ${emitted};\n`;
  }

  // Process light mode system tokens (default theme)
  const lightFlattened = flattenTokens(lightModeTokens as JsonObject);
  for (const [key, value] of Object.entries(lightFlattened)) {
    const emitted = emitCssValue(
      value,
      { ...coreTokens, ...lightModeTokens },
      key
    );
    css += `  --${key}: ${emitted};\n`;
  }

  css += `}\n\n[data-theme="dark"] {\n`;

  // Process dark mode overrides
  const darkFlattened = flattenTokens(darkModeTokens as JsonObject);
  for (const [key, value] of Object.entries(darkFlattened)) {
    const emitted = emitCssValue(
      value,
      { ...coreTokens, ...darkModeTokens },
      key
    );
    css += `  --${key}: ${emitted};\n`;
  }

  css += `}`;

  return css;
}

// Generate TypeScript definitions for the CSS variables
function generateTypeScriptDefinitions(): string {
  const coreFlattened = flattenTokens(coreTokens as JsonObject);
  const componentFlattened = flattenTokens(componentTokens as JsonObject);

  const lightFlattened = flattenTokens(lightModeTokens as JsonObject);
  const darkFlattened = flattenTokens(darkModeTokens as JsonObject);

  const allTokens = {
    ...coreFlattened,
    ...componentFlattened,
    ...lightFlattened,
    ...darkFlattened,
  };

  let ts = `// Design Tokens CSS Variables TypeScript Definitions
// Generated from design tokens

export interface DesignTokens {
`;

  for (const key of Object.keys(allTokens)) {
    ts += `  '${key}': string;\n`;
  }

  ts += `}

export const designTokens: DesignTokens = {
`;

  for (const key of Object.keys(allTokens)) {
    ts += `  '${key}': 'var(--${key})',\n`;
  }

  ts += `} as const;

// Helper function to get CSS variable value
export function getTokenValue(tokenName: keyof DesignTokens): string {
  return designTokens[tokenName];
}

// Helper function to get CSS variable with fallback
export function getTokenValueWithFallback(tokenName: keyof DesignTokens, fallback: string): string {
  return \`var(--\${tokenName}, \${fallback})\`;
}
`;

  return ts;
}

// Generate the CSS file
const cssContent = generateCSSVariables();
const outputDir = path.join(__dirname, "../../src/generated/css");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, "design-tokens.css"), cssContent);

// Generate TypeScript definitions
const tsContent = generateTypeScriptDefinitions();
fs.writeFileSync(path.join(__dirname, "design-tokens.ts"), tsContent);

console.log("✅ CSS variables generated successfully!");
console.log("📁 Output files:");
console.log("  - dist/css/design-tokens.css");
console.log("  - src/design-tokens/design-tokens.ts");
console.log("\n🎨 Usage:");
console.log("  1. Import the CSS file in your main CSS or HTML");
console.log(
  '  2. Use data-theme="light" or data-theme="dark" on your root element'
);
console.log(
  "  3. Use CSS variables like: color: var(--color-fill-background);"
);
console.log("  4. Import TypeScript definitions for type safety");
