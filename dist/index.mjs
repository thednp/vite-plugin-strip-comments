function e() {
  const n = /((?=\/\*)([\s\S]*?)\*\/)|((?=\/\/)([\s\S]*?)(?=\n))/gmi;
  return {
    name: "vite-plugin-strip-comments",
    transform(t) {
      return {
        // code: text.replace(/((?=\/\*)([\s\S]*?)\*\/)|((?=\/\/)([\s\S*?])\n)/gm, ""), // working with all
        // (^(?=\/\*)(?!(?!(legal|license))).*?\*\/$)|(^(?=\/\/)(?!(?=(legal|license))).*?\n$)
        // ^(?=\/\*|\/\/).*(?!legal|license).*(?=(\*\/|\n.+))$
        // code: text.replace(/((?=\/\*)(?!legal)([\s\S]*?)\*\/)|((?=\/\/)(?!legal)([\s\S])\n)/g, ""),
        // code: text.replace(/^(?=\/\*|\/\/).*(?!(legal|license)).*(?=(\*\/|\n.+))$/g, ""),
        code: t.replace(n, ""),
        map: null
      };
    }
  };
}
export {
  e as default
};
//# sourceMappingURL=index.mjs.map
