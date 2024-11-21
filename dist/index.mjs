const c = {
  type: "istanbul",
  enforce: "pre"
}, m = (l = {}) => {
  const a = {
    type: ["none", "keep-legal", "istanbul"].some((e) => e === l.type) ? l.type : c.type,
    enforce: ["pre", "post"].some((e) => e === l.enforce) ? l.enforce : c.enforce
  };
  return {
    name: "vite-plugin-strip-comments",
    enforce: a.enforce,
    transform(e, r) {
      if (!r || r.includes("node_modules") || !/\.([jt]sx?)$/.test(r))
        return { code: e, map: null };
      let t = e, n;
      const o = Array.from(e.matchAll(
        /\/\*[\s\S]*?\*\/|\/\*\*.*?\*\/|\/\/.*(?=\n)?/gm
      ));
      for (let s = 0; s < o.length; s += 1)
        switch ([n] = o[s], a.type) {
          case "keep-legal":
            ["@legal", "@license"].some((p) => n.includes(p)) || (t = t.replace(n, ""));
            break;
          case "istanbul":
            n.includes("istanbul") && (t = t.replace(n, ""));
            break;
          case "none":
          default:
            t = t.replace(n, "");
        }
      return { code: t, map: null };
    }
  };
};
export {
  m as default
};
//# sourceMappingURL=index.mjs.map
