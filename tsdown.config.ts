import { defineConfig } from "tsdown";
import strip from "./src/index.ts";
const pkg = await import("./package.json", { with: { type: "json" } }).then(
  (m) => m.default,
);
const banner = `/*!
 * Strip comments plugin for Vite
 * @author ${pkg.author}
 * @license ${pkg.license}
 * @version ${pkg.version}
 * @see ${pkg.homepage}
 */`;

export default defineConfig({
  entry: "src/index.ts",
  target: "esnext",
  exports: true,
  format: ["esm", "cjs"],
  banner,
  dts: true,
  clean: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
  globalName: "ViteStripComments",
  plugins: [strip({ type: "keep-jsdoc" })],
});
