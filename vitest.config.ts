import { defineConfig } from "vitest/config";

export default defineConfig({
  optimizeDeps: {
    include: [
      "@vitest/coverage-istanbul"
    ]
  },
  esbuild: {
    legalComments: 'inline',
  },
  build: {
    minify: 'esbuild',
  },
  test: {
    css: true,
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["html", "text", "lcov"],
      enabled: true,
      include: ["src/**/*.{ts,tsx}"],
    },
  },
});
