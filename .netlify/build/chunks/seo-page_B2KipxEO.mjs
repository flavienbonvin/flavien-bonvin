import { f as createAstro, c as createComponent, e as addAttribute, d as renderTemplate } from './astro/server_B0XwYhZu.mjs';
import 'clsx';
import { C as CONFIG } from './const_TmsguLgQ.mjs';

const $$Astro = createAstro("https://flavienbonvin.com");
const $$SeoPage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SeoPage;
  return renderTemplate`<title>${Astro2.props.title}</title><meta name="description"${addAttribute(Astro2.props.description, "content")}><link rel="canonical"${addAttribute(Astro2.request.url, "href")}><meta property="og:site_name"${addAttribute(`${CONFIG.author}`, "content")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(Astro2.props.title, "content")}><meta property="og:description"${addAttribute(Astro2.props.description, "content")}><meta property="og:url"${addAttribute(Astro2.request.url, "content")}><meta property="og:image" content="https://flavienbonvin.com/main_og.png"><meta property="og:image:width" content="1920"><meta property="og:image:height" content="1080"><meta name="twitter:card" content="summary"><meta name="twitter:title"${addAttribute(Astro2.props.title, "content")}><meta name="twitter:description"${addAttribute(Astro2.props.description, "content")}><meta name="twitter:url"${addAttribute(Astro2.request.url, "content")}><meta name="twitter:label1" content="Written by"><meta name="twitter:data1"${addAttribute(`${CONFIG.author}`, "content")}><meta name="twitter:site"${addAttribute(`@${CONFIG.twitter}`, "content")}><meta name="twitter:creator"${addAttribute(`@${CONFIG.twitter}`, "content")}><meta property="twitter:image" content="https://flavienbonvin.com/main_og.png">`;
}, "/Users/fbonvin/Developer/flavien-bonvin/src/layouts/seo-page.astro", void 0);

export { $$SeoPage as $ };
