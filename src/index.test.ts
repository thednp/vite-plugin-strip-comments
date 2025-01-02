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
* @see https://github.com
*/
requestAnimationFrame(console.log("test"));

const response = await fetch("https://github.com/thednp/vite-plugin-strip-comments");

/**
 * A global namespace for keyboard event keys.
 */
const keyboardEventKeys = {
  Backspace: "Backspace", // 8
  Tab: "Tab", // 9
  Enter: "Enter", // 13
  Shift: "Shift", // 16
  Control: "Control", // 17
  Alt: "Alt", // 18
  Pause: "Pause", // 19
  CapsLock: "CapsLock", // 20
  Escape: "Escape", // 27
  Scape: "Space", // 32
  ArrowLeft: "ArrowLeft", // 37
  ArrowUp: "ArrowUp", // 38
  ArrowRight: "ArrowRight", // 39
  ArrowDown: "ArrowDown", // 40
  Insert: "Insert", // 45
  Delete: "Delete", // 46
  Meta: "Meta", // 91 windows key
  ContextMenu: "ContextMenu", // 93
  ScrollLock: "ScrollLock", // 145
};
`;

describe("vite-plugin-strip-comments test", () => {
  it("not work without params", () => {
    const plugin = stripComments({ type: "none" });
    // @ts-expect-error - this is for testing purpose
    expect(plugin.transform().code, "no params found").to.be.undefined;
    expect(plugin.transform("// sample comment").code, "no id provided").to
      .equal(
        "// sample comment",
      );
  });

  it("strip all", () => {
    const plugin = stripComments({ type: "none" });
    const result = plugin.transform(testSample, "some/url.ts");
    console.log("\n\n>> strip all\n", result.code);
    expect(result.code, "all comments should be stripped").to.have.length.above(
      0,
    )
      .and.not.contain("istanbul").and.not.contain("@license").and.not.contain(
        "@legal",
      );
  });

  it("use no config", () => {
    const plugin = stripComments();
    const result = plugin.transform(testSample, "some/url.tsx");
    // console.log("\n\n>> strip istanbul\n", result.code);

    expect(result.code, "defaults to { type: 'keep-legal' }")
      .to.have.length.above(0).and.not.contain("istanbul");
  });

  it("strip all except legal, also enforce 'post'", () => {
    const plugin = stripComments({ type: "keep-legal", enforce: "post" });
    const result = plugin.transform(testSample, "some/url.js");
    // console.log("\n\n>> strip all except legal\n", result);

    expect(plugin.enforce).to.equal("post");
    expect(result.code).to.have.length.above(0)
      .and.contain("@legal").and.contain("@license").and.not.contain(
        "istanbul",
      );
  });

  it("retains URLs", () => {
    const plugin = stripComments({ type: "none" });
    const result = plugin.transform(testSample, "urls.js");
    expect(result.code, "URLs should have been retained")
      .to.contain(
        `const response = await fetch("https://github.com/thednp/vite-plugin-strip-comments");`,
      );
  });
});
