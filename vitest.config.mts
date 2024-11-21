import { defineConfig } from "vitest/config";
import stripComments from './src/index'

export default defineConfig({
  optimizeDeps: {
    include: [
      "@vitest/coverage-istanbul"
    ]
  },
  esbuild: {
    legalComments: 'inline',
  },
  plugins: [stripComments()],
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
