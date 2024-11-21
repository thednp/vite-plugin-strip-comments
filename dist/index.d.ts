declare const stripComments: (cfg?: Partial<StripCommentsConfig>) => {
    name: string;
    enforce: "pre" | "post" | undefined;
    transform(code: string, id?: string): {
        code: string;
        map: null;
    };
};
export default stripComments;

declare type StripCommentsConfig = {
    type: "none" | "keep-legal" | "istanbul";
    enforce: "pre" | "post" | undefined;
};

export { }
