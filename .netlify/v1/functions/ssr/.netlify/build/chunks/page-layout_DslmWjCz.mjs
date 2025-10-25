import { f as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, g as renderSlot, d as renderTemplate, r as renderComponent, h as renderScript, i as renderHead } from './astro/server_B0XwYhZu.mjs';
import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import './index_MaT6fT73.mjs';
import { Font as $$Font } from './_astro_assets_C7spZM0X.mjs';
import { $ as $$Icon } from './Icon_C6tt3p34.mjs';
import { U as URLS, R as ROUTES, C as CONFIG } from './const_TmsguLgQ.mjs';
import { $ as $$Divider } from './divider_BZqkWTF5.mjs';
import 'clsx';
/* empty css                         */

const $$Astro$4 = createAstro("https://flavienbonvin.com");
const $$ExternalLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ExternalLink;
  const { variant = "button" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(Astro2.props.href, "href")} target="_blank" rel="noopener noreferrer"${addAttribute([
    variant === "button" && "bg-background text-font-color rounded border border-zinc-300 px-2 py-3 text-center text-sm transition-colors duration-200 ease-in-out hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900",
    variant === "inline" && "underline",
    Astro2.props.classes
  ], "class:list")}>${renderSlot($$result, $$slots["default"])}</a>`;
}, "/Users/fbonvin/Developer/flavien-bonvin/src/components/atoms/external-link.astro", void 0);

const $$Astro$3 = createAstro("https://flavienbonvin.com");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${renderComponent($$result, "Divider", $$Divider, { "classes": "mb-7" })} ${maybeRenderHead()}<div class="flex flex-row flex-wrap gap-x-3 gap-y-3"> ${renderComponent($$result, "ExternalLink", $$ExternalLink, { "href": URLS.twitter, "classes": "flex w-36 items-center justify-center gap-2" }, { "default": ($$result2) => renderTemplate`Follow me on ${renderComponent($$result2, "Icon", $$Icon, { "name": "twitter" })}` })} ${renderComponent($$result, "ExternalLink", $$ExternalLink, { "href": `${Astro2.site}rss.xml`, "classes": "flex w-36 items-center justify-center gap-2" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "rss" })}RSS feed` })} ${renderComponent($$result, "ExternalLink", $$ExternalLink, { "href": URLS.blogGithub, "classes": "flex w-36 items-center justify-center gap-2" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "name": "github" })}Github` })} </div>`;
}, "/Users/fbonvin/Developer/flavien-bonvin/src/layouts/footer.astro", void 0);

const $$Logo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="text-font-color hover:text-font-color sm:text-font-color-muted dark:text-background dark:hover:text-background cursor-pointer font-mono"> <span class="bg-accent flex items-center gap-1.5 rounded-sm px-2 text-xl transition-colors"> ${renderComponent($$result, "Icon", $$Icon, { "name": "terminal", "class": "h-4 w-4" })}
Flavien
</span> </div>`;
}, "/Users/fbonvin/Developer/flavien-bonvin/src/components/atoms/logo.astro", void 0);

const $$Astro$2 = createAstro("https://flavienbonvin.com");
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navigation;
  const getIsActive = (href) => {
    return Astro2.url.pathname.includes(href);
  };
  return renderTemplate`${maybeRenderHead()}<nav class="text-font-color w-full py-6 font-mono"> <ul class="flex items-center justify-between"> <li> <a${addAttribute(ROUTES.home, "href")}> ${renderComponent($$result, "Logo", $$Logo, {})} </a> </li><li> <ul class="flex gap-3 tracking-tight sm:gap-6"> <li> <a${addAttribute(ROUTES.dev, "href")}${addAttribute([
    "decoration-dev hover:text-font-color decoration-2 underline-offset-2 transition-colors hover:underline",
    getIsActive(ROUTES.dev) ? "text-font-color underline" : "text-font-color-muted"
  ], "class:list")}>Dev</a> </li> <li> <a${addAttribute(ROUTES.beyond, "href")}${addAttribute([
    "decoration-beyond hover:text-font-color decoration-2 underline-offset-2 transition-colors hover:underline",
    getIsActive(ROUTES.beyond) ? "text-font-color underline" : "text-font-color-muted"
  ], "class:list")}>Beyond</a> </li> <li> <a${addAttribute(ROUTES.about, "href")}${addAttribute([
    "decoration-accent hover:text-font-color decoration-2 underline-offset-2 transition-colors hover:underline",
    getIsActive(ROUTES.about) ? "text-font-color underline" : "text-font-color-muted"
  ], "class:list")}>About</a> </li> </ul> </li> </ul> </nav>`;
}, "/Users/fbonvin/Developer/flavien-bonvin/src/layouts/navigation.astro", void 0);

const $$Astro$1 = createAstro("https://flavienbonvin.com");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/fbonvin/Developer/flavien-bonvin/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/fbonvin/Developer/flavien-bonvin/node_modules/astro/components/ClientRouter.astro", void 0);

const $$FaviconLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="manifest" href="/manifest/manifest.json"><link rel="mask-icon" href="/safari-pinned-tab.svg" color="#161616"><meta name="msapplication-TileColor" content="#161616"><link rel="icon" href="/favicon.svg" type="image/svg+xml">`;
}, "/Users/fbonvin/Developer/flavien-bonvin/src/layouts/favicon-layout.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://flavienbonvin.com");
const $$PageLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const { hideFooter = false } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="relative w-full"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="referrer" content="no-referrer-when-downgrade"><meta name="generator"', '><meta property="og:site_name"', ">", "", '<link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"', "", ">", "", "", "", '<meta name="theme-color" content="var(--background)">', '</head> <body class="text-font-color bg-background mx-auto max-w-2xl px-4 antialiased sm:px-4 md:px-0"> <header class="mb-10 md:mb-24"> ', ' </header> <main class="mb-14 w-full grow"> ', ' </main> <footer class="flex w-full flex-col gap-1 pb-20"> ', ' <script defer data-domain="flavienbonvin.com" data-api="/plausible/api/event" src="/plausible/js/script.js"><\/script> </footer> </body> </html>'])), addAttribute(Astro2.generator, "content"), addAttribute(`${CONFIG.author}`, "content"), renderSlot($$result, $$slots["head"]), renderComponent($$result, "FaviconLayout", $$FaviconLayout, {}), addAttribute(`${CONFIG.author}`, "title"), addAttribute(`${Astro2.site}rss.xml`, "href"), renderComponent($$result, "ClientRouter", $$ClientRouter, {}), renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-swiss-works", "preload": true }), renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-berkeley-mono", "preload": true }), renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-open-sans", "preload": true }), renderHead(), renderComponent($$result, "Navigation", $$Navigation, {}), renderSlot($$result, $$slots["default"]), !hideFooter && renderTemplate`${renderComponent($$result, "Footer", $$Footer, {})}`);
}, "/Users/fbonvin/Developer/flavien-bonvin/src/layouts/page-layout.astro", void 0);

export { $$PageLayout as $, $$ExternalLink as a };
