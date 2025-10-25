import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BfJbdp9z.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/404.astro.mjs');
const _page3 = () => import('./pages/about.astro.mjs');
const _page4 = () => import('./pages/api/get-data.astro.mjs');
const _page5 = () => import('./pages/articles/beyond.astro.mjs');
const _page6 = () => import('./pages/articles/dev.astro.mjs');
const _page7 = () => import('./pages/articles/_---slug_/og.png.astro.mjs');
const _page8 = () => import('./pages/articles/_---slug_.astro.mjs');
const _page9 = () => import('./pages/design-system.astro.mjs');
const _page10 = () => import('./pages/newsletter/validate.astro.mjs');
const _page11 = () => import('./pages/newsletter/validated.astro.mjs');
const _page12 = () => import('./pages/newsletter.astro.mjs');
const _page13 = () => import('./pages/rss.xml.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["src/pages/404.astro", _page2],
    ["src/pages/about.astro", _page3],
    ["src/pages/api/get-data.ts", _page4],
    ["src/pages/articles/beyond.astro", _page5],
    ["src/pages/articles/dev.astro", _page6],
    ["src/pages/articles/[...slug]/og.png.ts", _page7],
    ["src/pages/articles/[...slug]/index.astro", _page8],
    ["src/pages/design-system.astro", _page9],
    ["src/pages/newsletter/validate.astro", _page10],
    ["src/pages/newsletter/validated.astro", _page11],
    ["src/pages/newsletter/index.astro", _page12],
    ["src/pages/rss.xml.ts", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "cd6ca690-d57a-4006-bebe-8c0927bb5cf4"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
