declare const stripComments: (cfg?: Partial<StripCommentsConfig>) => {
    name: string;
    enforce: "pre" | "post";
    transform(code: string, id?: string): string;
};
export default stripComments;

declare type StripCommentsConfig = {
    type: "none" | "keep-legal" | "istanbul";
    enforce: "pre" | "post";
};

export { }
