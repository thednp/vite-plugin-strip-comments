/*!
 * Strip comments plugin for Vite
 * @author thednp
 * @license MIT
 * @version 0.0.9
 * @see https://github.com/thednp/vite-plugin-strip-comments#readme
 */
import { Plugin } from "vite";

//#region src/index.d.ts
type StripCommentsPlugin = Plugin<StripCommentsConfig> & {
  name: "vite-plugin-strip-comments";
  enforce: "pre" | "post" | undefined;
  apply: "build";
  transform: (code: string, id?: string) => {
    code: string;
    map: string | null;
  };
};
type StripCommentsConfig = {
  type: "none" | "keep-legal" | "keep-jsdoc";
  enforce: "pre" | "post" | undefined;
};
/**
 * Strip comments plugin for Vite gives you more control over which comments
 * are removed and which comments stay in your bundle.
 *
 * NOTES:
 * - the plugin should be compatible with rollup, rolldown, tsup, tsdown;
 * - make sure to disable other plugins or options to strip comment to prevent
 * overprocessing and long build times.
 * @param config The plugin configuration
 * @property config.type The type of strip to perform (default is "keep-legal")
 * @property config.enforce The step in which the strip should happen (default is "pre")
 * @returns The vite plugin itself
 * @see https://github.com/thednp/vite-plugin-strip-comments#readme
 *
 * @example
 * ```ts
 * import { defineConfig } from "vite"
 * import strip from "vite-plugin-strip-comments"
 *
 * export default defineConfig({
 *   // using default configuration
 *   plugins:[strip()]
 * })
 * ```
 */
declare const stripComments: (config?: Partial<StripCommentsConfig>) => {
  name: "vite-plugin-strip-comments";
  enforce: "pre" | "post" | undefined;
  apply: "build";
  transform(code: string, id?: string): {
    code: string;
    map: null;
  };
};
//#endregion
export { StripCommentsConfig, StripCommentsPlugin, stripComments as default };
//# sourceMappingURL=index.d.mts.map