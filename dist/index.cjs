"use strict";const c={type:"istanbul",enforce:"pre"},i=(n={})=>{const o={type:["none","keep-legal","istanbul"].some(e=>e===n.type)?n.type:c.type,enforce:["pre","post"].some(e=>e===n.enforce)?n.enforce:c.enforce};return{name:"vite-plugin-strip-comments",enforce:o.enforce,transform(e,s){if(!s||s.includes("node_modules")||!/\.([jt]sx?)$/.test(s))return{code:e,map:null};let t=e,l;const a=Array.from(e.matchAll(/\/\*[\s\S]*?\*\/|\/\/.*/gm));for(let r=0;r<a.length;r+=1)switch([l]=a[r],o.type){case"keep-legal":["@legal","@license"].some(p=>l.includes(p))||(t=t.replaceAll(l,""));break;case"istanbul":l.includes("istanbul")&&(t=t.replaceAll(l,""));break;case"none":default:t=t.replaceAll(l,"")}return{code:t,map:null}}}};module.exports=i;
//# sourceMappingURL=index.cjs.map
