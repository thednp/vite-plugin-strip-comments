"use strict";function e(){const t=/((?=\/\*)([\s\S]*?)\*\/)|((?=\/\/)([\s\S]*?)(?=\n))/gmi;return{name:"vite-plugin-strip-comments",transform(n){return{code:n.replace(t,""),map:null}}}}module.exports=e;
//# sourceMappingURL=index.cjs.map
