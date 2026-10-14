import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { graphics } from "./registry";

// ?only=<id> renders a single graphic on its own (used to record the README GIFs).
const only = new URLSearchParams(location.search).get("only");
const single = only ? graphics.find((g) => g.id === only) : undefined;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {single ? (
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <single.Component />
      </div>
    ) : (
      <App />
    )}
  </StrictMode>,
);
