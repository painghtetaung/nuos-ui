import type { CardPrimitiveProps } from "../types";

export default function CardPrimitive({
  title,
  subtitle,
  children,
}: CardPrimitiveProps) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "28rem",
        overflow: "hidden",
        borderRadius: "1rem",
        border: "1px solid var(--gen-ui-border, #e2e8f0)",
        backgroundColor: "var(--gen-ui-card-bg, #ffffff)",
      }}
    >
      {(title || subtitle) && (
        <div
          style={{
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--gen-ui-border, #e2e8f0)",
          }}
        >
          {title && (
            <h3
              style={{
                margin: 0,
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--gen-ui-text, #1a202c)",
              }}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p
              style={{
                margin: "0.125rem 0 0",
                fontSize: "0.75rem",
                color: "var(--gen-ui-text-muted, #718096)",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {children}
      </div>
    </div>
  );
}
