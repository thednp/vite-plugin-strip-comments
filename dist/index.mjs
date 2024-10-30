const s = {
  none: /((?=\/\*).*\*\/)|((?=((?<!\:)\/\/)).*(?=\n))/gm,
  "keep-legal": /(((?=(\/\*[\s\S](?!(\@legal|\@license)))).*\*\/)|((?=((?<!\:)\/\/[\s\S](?!(\@legal|\@license)))).*(?=\n)))/gm,
  istanbul: /(((?=(\/\*[\s\S]istanbul)).*\*\/)|((?=(\/\/[\s\S]istanbul)).*(?=\n)))/gm
}, m = (e) => ({
  name: "vite-plugin-strip-comments",
  /* @ts-expect-error - it's just how Vite plugins work */
  transform(n, l) {
    if (n?.length && (!l?.length || !l.includes("node_modules"))) {
      const t = ["none", "legal", "istanbul"].some(
        (a) => e?.type === a
      ) ? s[e?.type] : s.istanbul;
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
