import { describe, expect, it } from "vitest";
import stripComments from "../src/index";

const testSample = `
// sample text
//  sample text 1 
 // sample @legal 
// @legal sample  
console.log("test");
 // @license sample mm 

/* istanbul ignore next @preserve */ some other code
 /* istanbul ignore next */ 

/* sample comment */ other code
/* @legal sample */ 
 /* @legal @license */  
/* @license sample */
requestAnimationFrame(console.log("test"));
`;

describe("vite-plugin-strip-comments test", () => {
  it("strip'em all", () => {
    const plugin = stripComments();
    expect(plugin.transform(testSample, "some/url")?.code).to.have.length.above(
      0,
    );
    expect(plugin.transform(testSample)?.code).to.have.length.above(0);
    // expect(plugin.transform(testSample)).to.be.true;
    const pluginWithConfig = stripComments({ keep: "none" });
    expect(pluginWithConfig.transform(testSample)?.code).to.have.length.above(
      0,
    );
    expect(pluginWithConfig.transform(testSample, "some/url")?.code).to.have
      .length.above(0);
    // expect(plugin.transform(testSample)).to.be.true;
  });
});
