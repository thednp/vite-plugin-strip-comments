const p = {
  type: "keep-legal",
  enforce: "pre"
}, f = (n = {}) => {
  const o = {
    type: ["none", "keep-legal", "keep-jsdoc"].some((e) => e === n.type) ? n.type : p.type,
    enforce: ["pre", "post"].some((e) => e === n.enforce) ? n.enforce : p.enforce
  };
  return {
    name: "vite-plugin-strip-comments",
    enforce: o.enforce,
    apply: "build",
    transform(e, r) {
      if (!r || r.includes("node_modules") || !/\.([jt]sx?)$/.test(r))
        return { code: e, map: null };
      let t = e, s;
      const a = Array.from(
        e.matchAll(
          /\/\*[\s\S]*?\*\/|\/\*\*.*?\*\/|(?<!https?:)\/\/.*(?=\n)?/gm
        )
      );
      for (let l = 0; l < a.length; l += 1) {
        [s] = a[l];
        const m = s.startsWith("/**"), c = ["@legal", "@license", "@copyright"].some(
          (i) => s.includes(i)
        );
        switch (o.type) {
          case "keep-jsdoc":
            !m && !c && (t = t.replace(s, ""));
            break;
          case "keep-legal":
            c || (t = t.replace(s, ""));
            break;
          default:
            t = t.replace(s, "");
        }
      }
      return { code: t, map: null };
    }
  };
};
export {
  f as default
};
//# sourceMappingURL=index.mjs.map
