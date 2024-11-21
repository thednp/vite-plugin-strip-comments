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

/*
* multi
* line
* comment
*/
requestAnimationFrame(console.log("test"));
`;

describe("vite-plugin-strip-comments test", () => {
  it("not work without params", () => {
    const plugin = stripComments({ type: "none" });
    // @ts-expect-error - this is for testing purpose
    expect(plugin.transform(), "no params found").to.be.undefined;
    expect(plugin.transform("// sample comment"), "no id provided").to.equal(
      "// sample comment",
    );
  });

  it("strip all", () => {
    const plugin = stripComments({ type: "none" });
    const result = plugin.transform(testSample, "some/url");
    // console.log("\n\n>> strip all\n", result);
    expect(result, "all comments should be stripped").to.have.length.above(0)
      .and.not.contain("istanbul").and.not.contain("@license").and.not.contain(
        "@legal",
      );
  });

  it("strip istanbul", () => {
    const plugin = stripComments();
    const result = plugin.transform(testSample, "some/url");
    // console.log("\n\n>> strip istanbul\n", result);

    expect(result, "defaults to { type: 'istanbul' }")
      .to.have.length.above(0).and.not.contain("istanbul");
  });

  it("strip all except legal, also enforce 'post'", () => {
    const plugin = stripComments({ type: "keep-legal", enforce: "post" });
    const result = plugin.transform(testSample, "some/url");
    // console.log("\n\n>> strip all except legal\n", result);

    expect(plugin.enforce).to.equal("post");
    expect(result).to.have.length.above(0)
      .and.contain("@legal").and.contain("@license").and.not.contain(
        "istanbul",
      );
  });
});
