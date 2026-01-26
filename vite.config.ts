import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import strip from "./src/index";

const NAME = "VitePluginStripComments";

const fileName = {
  es: `index.mjs`,
  cjs: `index.cjs`,
} as const;

export default defineConfig({
  base: "./",
  esbuild: {
    legalComments: "none",
  },
  plugins: [
    dts({
      outDir: "dist",
      copyDtsFiles: true,
      rollupTypes: true,
    }),
    strip(),
  ],
  build: {
    minify: "esbuild",
    emptyOutDir: true,
    outDir: "dist",
    target: "ESNext",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: NAME,
      formats: ["es", "cjs"],
      fileName: (format) => fileName[format as "es" | "cjs"],
    },
    sourcemap: true,
  },
});
