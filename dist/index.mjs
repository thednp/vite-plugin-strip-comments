const p = {
  type: "keep-legal",
  enforce: "pre"
}, m = (n = {}) => {
  const s = {
    type: ["none", "keep-legal"].some((e) => e === n.type) ? n.type : p.type,
    enforce: ["pre", "post"].some((e) => e === n.enforce) ? n.enforce : p.enforce
  };
  return {
    name: "vite-plugin-strip-comments",
    enforce: s.enforce,
    apply: "build",
    transform(e, r) {
      if (!r || r.includes("node_modules") || !/\.([jt]sx?)$/.test(r))
        return { code: e, map: null };
      let t = e, l;
      const a = Array.from(e.matchAll(
        /\/\*[\s\S]*?\*\/|\/\*\*.*?\*\/|\/\/.*(?=\n)?/gm
      ));
      for (let o = 0; o < a.length; o += 1)
        switch ([l] = a[o], s.type) {
          case "keep-legal":
            ["@legal", "@license"].some((c) => l.includes(c)) || (t = t.replace(l, ""));
            break;
          case "none":
          default:
            t = t.replace(l, "");
        }
      return { code: t, map: null };
    }
  };
};
export {
  m as default
};
//# sourceMappingURL=index.mjs.map
