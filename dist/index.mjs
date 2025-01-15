const a = {
  type: "keep-legal",
  enforce: "pre"
}, m = (n = {}) => {
  const o = {
    type: ["none", "keep-legal"].some((e) => e === n.type) ? n.type : a.type,
    enforce: ["pre", "post"].some((e) => e === n.enforce) ? n.enforce : a.enforce
  };
  return {
    name: "vite-plugin-strip-comments",
    enforce: o.enforce,
    apply: "build",
    transform(e, r) {
      if (!r || r.includes("node_modules") || !/\.([jt]sx?)$/.test(r))
        return { code: e, map: null };
      let t = e, l;
      const p = Array.from(e.matchAll(
        /\/\*[\s\S]*?\*\/|\/\*\*.*?\*\/|(?<!https?:)\/\/.*(?=\n)?/gm
      ));
      for (let s = 0; s < p.length; s += 1)
        switch ([l] = p[s], o.type) {
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
