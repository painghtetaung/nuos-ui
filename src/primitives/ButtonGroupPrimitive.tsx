import type { ButtonGroupPrimitiveProps } from "../types";

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--gen-ui-btn-primary-bg, #3182ce)",
    color: "var(--gen-ui-btn-primary-text, #ffffff)",
    border: "none",
  },
  secondary: {
    backgroundColor: "var(--gen-ui-btn-secondary-bg, #edf2f7)",
    color: "var(--gen-ui-btn-secondary-text, #2d3748)",
    border: "none",
  },
  outline: {
    backgroundColor: "transparent",
    color: "var(--gen-ui-btn-outline-text, #2d3748)",
    border: "1px solid var(--gen-ui-border, #e2e8f0)",
  },
};

export default function ButtonGroupPrimitive({
  buttons = [],
}: ButtonGroupPrimitiveProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {buttons.map((btn, i) => (
        <button
          key={i}
          style={{
            padding: "0.375rem 0.75rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: "0.5rem",
            cursor: "pointer",
            ...variantStyles[btn.variant ?? "primary"],
          }}
          onClick={() => {
            if (btn.url) window.open(btn.url, "_blank");
          }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
