# vite-plugin-strip-comments

[![Coverage Status](https://coveralls.io/repos/github/thednp/vite-plugin-strip-comments/badge.svg)](https://coveralls.io/github/thednp/vite-plugin-strip-comments)
[![ci](https://github.com/thednp/vite-plugin-strip-comments/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/vite-plugin-strip-comments/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/vite-plugin-strip-comments.svg)](https://www.npmjs.com/package/vite-plugin-strip-comments)
[![NPM Downloads](https://img.shields.io/npm/dm/vite-plugin-strip-comments.svg)](http://npm-stat.com/charts.html?package=vite-plugin-strip-comments)
[![typescript version](https://img.shields.io/badge/typescript-5.7.2-brightgreen)](https://www.typescriptlang.org/)
[![vitest version](https://img.shields.io/badge/vitest-2.1.8-brightgreen)](https://vitest.dev/)
[![vite version](https://img.shields.io/badge/vite-5.4.11-brightgreen)](https://github.com/vitejs)

A very simple Vite plugin for stripping comments in your production code. Some comments just don't get removed no matter what minify options you set, especially `/* istanbul ignore */` flags. Keep in mind this is experimental, please **use with caution**.

## Install

```bash
pnpm install -D vite-plugin-strip-comments
```

```bash
yarn add -D vite-plugin-strip-comments
```

```bash
npm install -D vite-plugin-strip-comments
```

```bash
deno add -D npm:vite-plugin-strip-comments@latest
```

## Usage

```ts
// vite.config.mts
import stripComments from 'vite-plugin-strip-comments';

export default defineConfig({
  plugins: [
    // ... other plugins
    stripComments({ type: 'none' }),
    // 'none' means to keep no comments
  ],
});
```

**Options**

* type: "none" | "keep-legal" (default) - changes the behavior of the transform function
  * **none** removes all comments
  * **keep-legal** remove all commments except those which contain `@legal` or `@license`, a very good practice to allow open source to shine yes?
* enforce: "pre" (default) | "post" - determines where in the compilation pipeline the plugin should work;

## Contributions
* Found a problem, [report](https://github.com/thednp/vite-plugin-strip-comments/issues) the problem. Thank you!
* Found a fix? Clone, install, apply fix and commit. Thank you!


## License
**vite-plugin-strip-comments** is released under the [MIT License](https://github.com/thednp/vite-plugin-strip-comments/blob/master/LICENSE).
