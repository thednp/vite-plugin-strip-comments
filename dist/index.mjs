const c = {
  type: "istanbul",
  enforce: "pre"
}, p = (l = {}) => {
  const s = {
    type: ["none", "keep-legal", "istanbul"].some((e) => e === l.type) ? l.type : c.type,
    enforce: ["pre", "post"].some((e) => e === l.enforce) ? l.enforce : c.enforce
  };
  return {
    name: "vite-plugin-strip-comments",
    enforce: s.enforce,
    transform(e, a) {
      if (!a || a.includes("node_modules")) return e;
      let t = e, n;
      const o = Array.from(e.matchAll(
        /\/\*[\s\S]*?\*\/|\/\/.*/gm
      ));
      for (let r = 0; r < o.length; r += 1)
        switch ([n] = o[r], s.type) {
          case "keep-legal":
            ["@legal", "@license"].some((i) => n.includes(i)) || (t = t.replaceAll(n, ""));
            break;
          case "istanbul":
            n.includes("istanbul") && (t = t.replaceAll(n, ""));
            break;
          case "none":
          default:
            t = t.replaceAll(n, "");
        }
      return t;
    }
  };
};
export {
  p as default
};
//# sourceMappingURL=index.mjs.map
