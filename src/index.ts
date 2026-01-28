import type { Plugin } from "vite";

export type StripCommentsPlugin = Plugin<StripCommentsConfig> & {
  name: "vite-plugin-strip-comments";
  enforce: "pre" | "post" | undefined;
  apply: "build";
  transform: (
    code: string,
    id?: string,
  ) => {
    code: string;
    map: string | null;
  };
};

export type StripCommentsConfig = {
  type: "none" | "keep-legal" | "keep-jsdoc";
  enforce: "pre" | "post" | undefined;
};

const StripCommentsDefaultConfig: StripCommentsConfig = {
  type: "keep-legal",
  enforce: "pre",
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
const stripComments = (config: Partial<StripCommentsConfig> = {}) => {
  const cfg: Partial<StripCommentsConfig> = {
    type: ["none", "keep-legal", "keep-jsdoc"].some((x) => x === config.type)
      ? config.type
      : StripCommentsDefaultConfig.type,
    enforce: ["pre", "post"].some((x) => x === config.enforce)
      ? config.enforce
      : StripCommentsDefaultConfig.enforce,
  };

  return {
    name: "vite-plugin-strip-comments",
    enforce: cfg.enforce,
    apply: "build",
    transform(code: string, id?: string): { code: string; map: null } {
      /* istanbul ignore if @preserve */
      if (!id || id.includes("node_modules") || !/\.([jt]sx?)$/.test(id)) {
        return { code, map: null };
      }
      const LEGAL_REGEX = /\/\*!\s*|@(?:legal|license|copyright)\b/;
      const COMMENT_REGEX =
        /\/\*[\s\S]*?\*\/|\/\*\*.*?\*\/|(?<!https?:)\/\/.*(?=\n)?/gm;
      let result = code;
      const matches = code.matchAll(COMMENT_REGEX);
      const toRemove: string[] = [];

      for (const match of matches) {
        const comment = match[0];
        let shouldRemove = false;

        switch (cfg.type) {
          case "keep-jsdoc":
            shouldRemove = !comment.startsWith("/**") &&
              !LEGAL_REGEX.test(comment);
            break;
          case "keep-legal":
            shouldRemove = !LEGAL_REGEX.test(comment);
            break;
          case "none":
          default:
            shouldRemove = true;
        }
        if (shouldRemove) {
          toRemove.push(comment);
        }
      }

      for (const comment of toRemove) {
        result = result.replace(comment, "");
      }

      return { code: result, map: null };
    },
  } satisfies StripCommentsPlugin;
};

export default stripComments;
