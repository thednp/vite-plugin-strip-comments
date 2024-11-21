const c = {
  type: "istanbul",
  enforce: "pre"
}, m = (n = {}) => {
  const a = {
    type: ["none", "keep-legal", "istanbul"].some((e) => e === n.type) ? n.type : c.type,
    enforce: ["pre", "post"].some((e) => e === n.enforce) ? n.enforce : c.enforce
  };
  return {
    name: "vite-plugin-strip-comments",
    enforce: a.enforce,
    transform(e, r) {
      if (!r || r.includes("node_modules") || !/\.([jt]sx?)$/.test(r))
        return { code: e, map: null };
      let t = e, l;
      const o = Array.from(e.matchAll(
        /\/\*[\s\S]*?\*\/|\/\/.*/gm
      ));
      for (let s = 0; s < o.length; s += 1)
        switch ([l] = o[s], a.type) {
          case "keep-legal":
            ["@legal", "@license"].some((p) => l.includes(p)) || (t = t.replaceAll(l, ""));
            break;
          case "istanbul":
            l.includes("istanbul") && (t = t.replaceAll(l, ""));
            break;
          case "none":
          default:
            t = t.replaceAll(l, "");
        }
      return { code: t, map: null };
    }
  };
};
export {
  m as default
};
//# sourceMappingURL=index.mjs.map
