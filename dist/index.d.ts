declare const stripComments: (cfg?: Partial<StripCommentsConfig>) => {
    name: string;
    enforce: "pre" | "post" | undefined;
    apply: "build";
    transform(code: string, id?: string): {
        code: string;
        map: null;
    };
};
export default stripComments;

declare type StripCommentsConfig = {
    type: "none" | "keep-legal";
    enforce: "pre" | "post" | undefined;
};

export { }
