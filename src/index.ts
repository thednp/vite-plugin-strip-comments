import { type Plugin } from "vite";

export type StripCommentsPlugin = Plugin<StripCommentsConfig> & {
  name: string;
  enforce: "pre" | "post" | undefined;
  transform: (
    code: string,
    id?: string,
  ) => {
    code: string;
    map: string | null;
  };
};

export type StripCommentsConfig = {
  type: "none" | "keep-legal" | "istanbul";
  enforce: "pre" | "post" | undefined;
};

const StripCommentsDefaultConfig: StripCommentsConfig = {
  type: "istanbul",
  enforce: "pre",
};

const stripComments = (cfg: Partial<StripCommentsConfig> = {}) => {
  const config: Partial<StripCommentsConfig> = {
    type:
      (["none", "keep-legal", "istanbul"].some((x) => x === cfg.type)
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
    transform(code: string, id?: string): { code: string; map: null } {
      /* istanbul ignore if @preserve */
      if (!id || id.includes("node_modules") || !/\.([jt]sx?)$/.test(id)) {
        return { code, map: null };
      }
      let result = code;
      let match: string;

      const matchesArray = Array.from(code.matchAll(
        /\/\*[\s\S]*?\*\/|\/\/.*/gm,
      ));

      for (let i = 0; i < matchesArray.length; i += 1) {
        // capture first match
        [match] = matchesArray[i];

        switch (config.type) {
          case "keep-legal":
            if (!["@legal", "@license"].some((x) => match.includes(x))) {
              result = result.replaceAll(match, "");
            }
            break;
          case "istanbul":
            if (match.includes("istanbul")) {
              /* istanbul ignore next @preserve */
              result = result.replaceAll(match, "");
            }
            break;
          case "none":
          default:
            result = result.replaceAll(match, "");
        }
      }

      return { code: result, map: null };
    },
  } satisfies StripCommentsPlugin;
};

export default stripComments;
