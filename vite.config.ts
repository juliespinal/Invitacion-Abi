import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Deploy target: GitHub Pages. `base` se ajusta al nombre del repo cuando
// se cree (ej. "/abi-15/"); en desarrollo y en un dominio propio queda en "/".
const REPO_BASE = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  base: REPO_BASE,
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "es2022",
    sourcemap: false,
  },
});
