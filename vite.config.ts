import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@mui/styled-engine",
        replacement: "@mui/styled-engine-sc",
      },
    ],
  },
  base: "/gympress/",
});
