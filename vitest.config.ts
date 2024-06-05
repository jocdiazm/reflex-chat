import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import magicalSvg from "vite-plugin-magical-svg";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    magicalSvg({
      target: "react",
    }),
  ],
  test: {
    environment: "jsdom",
    // setupFiles: "./src/__tests__/setupTests.ts",
  },
});
