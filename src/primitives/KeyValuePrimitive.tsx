import type { KeyValuePrimitiveProps } from "../types";

export default function KeyValuePrimitive({
  items = [],
}: KeyValuePrimitiveProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <span
            style={{
              flexShrink: 0,
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--gen-ui-text-muted, #718096)",
            }}
          >
            {item.label}
          </span>
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              textAlign: "right",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "var(--gen-ui-text, #1a202c)",
            }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
