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
  type: "none" | "keep-legal";
  enforce: "pre" | "post" | undefined;
};

const StripCommentsDefaultConfig: StripCommentsConfig = {
  type: "keep-legal",
  enforce: "pre",
};

const stripComments = (cfg: Partial<StripCommentsConfig> = {}) => {
  const config: Partial<StripCommentsConfig> = {
    type:
      (["none", "keep-legal"].some((x) => x === cfg.type)
        ? cfg.type
        : StripCommentsDefaultConfig.type) as StripCommentsConfig["type"],
    enforce:
      (["pre", "post"].some((x) => x === cfg.enforce)
        ? cfg.enforce
        : StripCommentsDefaultConfig.enforce) as StripCommentsConfig["enforce"],
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

      const matchesArray = Array.from(code.matchAll(
        /\/\*[\s\S]*?\*\/|\/\*\*.*?\*\/|\/\/.*(?=\n)?/gm,
      ));

      for (let i = 0; i < matchesArray.length; i += 1) {
        // first match
        [match] = matchesArray[i];

        switch (config.type) {
          case "keep-legal":
            if (!["@legal", "@license"].some((x) => match.includes(x))) {
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
