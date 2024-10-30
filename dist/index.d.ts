declare function stripComments(): StripCommentsOutput;
export default stripComments;

declare type StripCommentsOutput = {
    name: string;
    transform: (text: string) => {
        code: string;
        map: string | null;
    };
};

export { }
