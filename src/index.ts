import { type Plugin } from "vite";

export type StripCommentsPlugin = Plugin<StripCommentsConfig> & {
  name: string;
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

const stripComments = (cfg: Partial<StripCommentsConfig> = {}) => {
  const config: Partial<StripCommentsConfig> = {
    type: ["none", "keep-legal", "keep-jsdoc"].some((x) => x === cfg.type)
      ? cfg.type
      : StripCommentsDefaultConfig.type,
    enforce: ["pre", "post"].some((x) => x === cfg.enforce)
      ? cfg.enforce
      : StripCommentsDefaultConfig.enforce,
  };

  return {
    name: "vite-plugin-strip-comments",
    enforce: config.enforce,
    apply: "build",
    transform(code: string, id?: string): { code: string; map: null } {
      /* istanbul ignore if @preserve */
      if (!id || id.includes("node_modules") || !/\.([jt]sx?)$/.test(id)) {
        return { code, map: null };
      }
      let result = code;
      let match: string;

      const matchesArray = Array.from(
        code.matchAll(
          /\/\*[\s\S]*?\*\/|\/\*\*.*?\*\/|(?<!https?:)\/\/.*(?=\n)?/gm,
        ),
      );

      for (let i = 0; i < matchesArray.length; i += 1) {
        // first match
        [match] = matchesArray[i];
        const isJSDoc = match.startsWith("/**");
        const isLegal = ["@legal", "@license", "@copyright"].some((x) =>
          match.includes(x)
        );
        // console.log({ isJSDoc, isLegal, match });

        switch (config.type) {
          case "keep-jsdoc":
            if (!isJSDoc && !isLegal) {
              result = result.replace(match, "");
            }
            break;
          case "keep-legal":
            if (!isLegal) {
              result = result.replace(match, "");
            }
            break;
          case "none":
          default:
            result = result.replace(match, "");
        }
      }

      return { code: result, map: null };
    },
  } satisfies StripCommentsPlugin;
};

export default stripComments;
