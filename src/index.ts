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
  keep: "none" | "legal" | "istanbul";
};

const replacements: Record<"none" | "legal" | "istanbul", RegExp> = {
  none: /((?=\/\*).*\*\/)|((?=((?<!\:)\/\/)).*(?=\n))/gm,
  legal:
    /(((?=(\/\*[\s\S](?!(\@legal|\@license)))).*\*\/)|((?=((?<!\:)\/\/[\s\S](?!(\@legal|\@license)))).*(?=\n)))/gm,
  istanbul:
    /(((?=(\/\*[\s\S]istanbul)).*\*\/)|((?=(\/\/[\s\S]istanbul)).*(?=\n)))/gm,
};

const stripComments = (cfg?: Partial<StripCommentsConfig>) => {
  return {
    name: "vite-plugin-strip-comments",
    /* @ts-expect-error */
    transform(code: string, id?: string) {
      if (code?.length && (!id?.length || !id.includes("node_modules"))) {
        const replacement = ["none", "legal", "istanbul"].some((x) =>
            cfg?.keep === x
          )
          ? replacements[cfg?.keep as StripCommentsConfig["keep"]]
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
