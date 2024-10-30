# vite-plugin-strip-comments

[![Coverage Status](https://coveralls.io/repos/github/thednp/vite-plugin-strip-comments/badge.svg)](https://coveralls.io/github/thednp/vite-plugin-strip-comments)
[![ci](https://github.com/thednp/vite-plugin-strip-comments/actions/workflows/ci.yml/badge.svg)](https://github.com/thednp/vite-plugin-strip-comments/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/vite-plugin-strip-comments.svg)](https://www.npmjs.com/package/vite-plugin-strip-comments)
[![NPM Downloads](https://img.shields.io/npm/dm/vite-plugin-strip-comments.svg)](http://npm-stat.com/charts.html?package=vite-plugin-strip-comments)
[![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hw/vite-plugin-strip-comments)](https://www.jsdelivr.com/package/npm/vite-plugin-strip-comments)
[![typescript version](https://img.shields.io/badge/typescript-5.6.3-brightgreen)](https://www.typescriptlang.org/)
[![vitest version](https://img.shields.io/badge/vitest-2.1.4-brightgreen)](https://vitest.dev/)
[![vite version](https://img.shields.io/badge/vite-5.4.10-brightgreen)](https://github.com/vitejs)

A simple Vite plugin for stripping comments in your production code. Some comments just don't get removed no matter what minify options you set. Also keep in mind this is experimental, so **use with caution**.

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
deno install -D npm:vite-plugin-strip-comments@latest
```

## Usage

```ts
// vite.config.mts
import stripComments from 'vite-plugin-strip-comments';

export default defineConfig({
  plugins: [
    // ... other plugins
    stripComments(),
  ],
});
```

## Contributions
* Found a problem, report the problem. Thank you
* Found a fix? Clone, install, apply fix and commit. Thank you


## License
**vite-plugin-strip-comments** is released under the [MIT License](https://github.com/thednp/vite-plugin-strip-comments/blob/master/LICENSE).
