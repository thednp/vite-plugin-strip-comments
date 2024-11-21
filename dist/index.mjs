const c = {
  type: "istanbul",
  enforce: "pre"
}, m = (l = {}) => {
  const r = {};
  return r.type = ["none", "keep-legal", "istanbul"].some((e) => e === l.type) ? l.type : c.type, r.enforce = ["pre", "post"].some((e) => e === l.enforce) ? l.enforce : c.enforce, {
    name: "vite-plugin-strip-comments",
    enforce: r.enforce,
    transform(e, a) {
      if (!a || a.includes("node_modules")) return e;
      let t = e;
      const i = e.matchAll(
        /\/\*[\s\S]*?\*\/|\/\/.*/gm
      ), o = Array.from(i);
      let n;
      for (let s = 0; s < o.length; s += 1)
        switch ([n] = o[s], r.type) {
          case "keep-legal":
            ["@legal", "@license"].some((p) => n.includes(p)) || (t = t.replaceAll(n, ""));
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
  m as default
};
//# sourceMappingURL=index.mjs.map
