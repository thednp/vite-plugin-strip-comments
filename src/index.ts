export type StripCommentsPlugin = {
  name: string;
  enforce: "pre" | "post";
  transform: (
    code: string,
    id?: string,
  ) => string;
};

export type StripCommentsConfig = {
  type: "none" | "keep-legal" | "istanbul";
  enforce: "pre" | "post";
};

const StripCommentsDefaultConfig: StripCommentsConfig = {
  type: "istanbul",
  enforce: "pre",
};

const stripComments = (cfg: Partial<StripCommentsConfig> = {}) => {
  const config: Partial<StripCommentsConfig> = {};
  config.type = ["none", "keep-legal", "istanbul"].some((x) => x === cfg.type)
    ? cfg.type as StripCommentsConfig["type"]
    : StripCommentsDefaultConfig.type;
  config.enforce = ["pre", "post"].some((x) => x === cfg.enforce)
    ? cfg.enforce as StripCommentsConfig["enforce"]
    : StripCommentsDefaultConfig.enforce;

  return {
    name: "vite-plugin-strip-comments",
    enforce: config.enforce,
    transform(code: string, id?: string) {
      /* istanbul ignore if @preserve */
      if (!id || id.includes("node_modules")) return code;
      let result = code;

      const matches = code.matchAll(
        /\/\*[\s\S]*?\*\/|\/\/.*/gm,
      );
      const matchesArray = Array.from(matches);
      let match: string;

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

      return result;
    },
  } satisfies StripCommentsPlugin;
};

export default stripComments;
