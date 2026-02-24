import { useState } from "react";
import UIRenderer from "../src/renderer";
import type { UINode } from "../src/types";

const sampleTree: UINode = {
  type: "card",
  children: [
    {
      type: "card-header",
      children: [
        { type: "card-title", props: { children: "Client Overview" } },
        { type: "card-description", props: { children: "Last updated 2 hours ago" } },
      ],
    },
    {
      type: "card-content",
      children: [
        { type: "button", props: { label: "Open Project", variant: "primary" } },
        { type: "button", props: { label: "View Docs", variant: "outline" } },
      ],
    },
  ],
};

export default function App() {
  const [json, setJson] = useState(JSON.stringify(sampleTree, null, 2));
  const [tree, setTree] = useState<UINode>(sampleTree);
  const [error, setError] = useState("");

  const handleApply = () => {
    try {
      const parsed = JSON.parse(json);
      setTree(parsed);
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem", minHeight: "100vh" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h2 style={{ margin: 0 }}>JSON Input</h2>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          style={{
            flex: 1,
            fontFamily: "monospace",
            fontSize: "0.8125rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #e2e8f0",
            resize: "none",
          }}
        />
        {error && <p style={{ color: "red", margin: 0, fontSize: "0.75rem" }}>{error}</p>}
        <button
          onClick={handleApply}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#3182ce",
            color: "white",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Apply JSON
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h2 style={{ margin: 0 }}>Rendered Output</h2>
        <div style={{ padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0", flex: 1 }}>
          <UIRenderer node={tree} />
        </div>
      </div>
    </div>
  );
}
