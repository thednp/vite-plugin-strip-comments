const s = {
  none: /((?=\/\*).*\*\/)|((?=((?<!\:)\/\/)).*(?=\n))/gm,
  legal: /(((?=(\/\*[\s\S](?!(\@legal|\@license)))).*\*\/)|((?=((?<!\:)\/\/[\s\S](?!(\@legal|\@license)))).*(?=\n)))/gm,
  istanbul: /(((?=(\/\*[\s\S]istanbul)).*\*\/)|((?=(\/\/[\s\S]istanbul)).*(?=\n)))/gm
}, m = (e) => ({
  name: "vite-plugin-strip-comments",
  /* @ts-expect-error */
  transform(n, l) {
    if (n?.length && (!l?.length || !l.includes("node_modules"))) {
      const t = ["none", "legal", "istanbul"].some(
        (a) => e?.keep === a
      ) ? s[e?.keep] : s.istanbul;
      return {
        code: n.replace(t, ""),
        map: null
      };
    }
  }
});
export {
  m as default
};
//# sourceMappingURL=index.mjs.map
