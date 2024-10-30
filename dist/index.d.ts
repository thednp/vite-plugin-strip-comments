declare const stripComments: (cfg?: Partial<StripCommentsConfig>) => {
    name: string;
    transform(code: string, id?: string): {
        code: string;
        map: null;
    } | undefined;
};
export default stripComments;

/**
 * @default 'istanbul'
 */
declare type StripCommentsConfig = {
    type: "none" | "keep-legal" | "istanbul";
};

export { }
