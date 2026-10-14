import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Builds the whole dashboard into ONE html file (../dashboard/index.html)
// so it opens straight from disk — no server, no install for the end user.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  base: "./",
  // The graphics live outside /app (in the skill folder), so point their bare
  // imports at this app's node_modules.
  resolve: {
    alias: [
      { find: /^react$/, replacement: path.resolve("node_modules/react") },
      { find: /^react\/(.*)$/, replacement: path.resolve("node_modules/react") + "/$1" },
      { find: /^motion\/react$/, replacement: path.resolve("node_modules/motion/dist/es/react.mjs") },
    ],
  },
  build: {
    outDir: "../dashboard",
    emptyOutDir: true,
  },
  server: { fs: { allow: [".."] } },
});
