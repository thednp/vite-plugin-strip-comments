export type StripCommentsOutput = {
  name: string;
  transform: (
    text: string,
    id: string | undefined,
  ) => undefined | { code: string; map: string | null };
};

/**
 * @default 'istanbul'
 */
export type StripCommentsConfig = {
  type: "none" | "keep-legal" | "istanbul";
};

const replacements: Record<"none" | "keep-legal" | "istanbul", RegExp> = {
  none: /((?=\/\*).*\*\/)|((?=((?<!\:)\/\/)).*(?=\n))/gm,
  "keep-legal":
    /(((?=(\/\*[\s\S](?!(\@legal|\@license)))).*\*\/)|((?=((?<!\:)\/\/[\s\S](?!(\@legal|\@license)))).*(?=\n)))/gm,
  istanbul:
    /(((?=(\/\*[\s\S]istanbul)).*\*\/)|((?=(\/\/[\s\S]istanbul)).*(?=\n)))/gm,
};

const stripComments = (cfg?: Partial<StripCommentsConfig>) => {
  return {
    name: "vite-plugin-strip-comments",
    /* @ts-expect-error - it's just how Vite plugins work */
    transform(code: string, id?: string) {
      /* istanbul ignore else @preserve */
      if (code?.length && (!id?.length || !id.includes("node_modules"))) {
        const replacement = ["none", "legal", "istanbul"].some((x) =>
            cfg?.type === x
          )
          ? replacements[cfg?.type as StripCommentsConfig["type"]]
          : replacements["istanbul"];
        return {
          code: code.replace(replacement, ""),
          map: null,
        };
      }
    },
  } satisfies StripCommentsOutput;
};

export default stripComments;
