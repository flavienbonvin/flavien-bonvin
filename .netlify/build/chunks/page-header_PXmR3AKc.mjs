import { f as createAstro, c as createComponent, r as renderComponent, m as maybeRenderHead, e as addAttribute, g as renderSlot, d as renderTemplate } from './astro/server_B0XwYhZu.mjs';
import { a as articleCardWidth } from './const_TmsguLgQ.mjs';
import { $ as $$Divider } from './divider_BZqkWTF5.mjs';
import { $ as $$H1 } from './h1_DVJ8czU4.mjs';

const $$Astro = createAstro("https://flavienbonvin.com");
const $$PageHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageHeader;
  return renderTemplate`${renderComponent($$result, "H1", $$H1, { "classes": "font-serif font-bold mb-1 text-2xl sm:text-3xl" }, { "default": ($$result2) => renderTemplate`${Astro2.props.title}` })} ${maybeRenderHead()}<p${addAttribute(["mb-4 font-sans sm:mb-6 sm:text-lg sm:text-pretty", articleCardWidth], "class:list")}>${renderSlot($$result, $$slots["default"])}</p> ${Astro2.props.noDivider ? renderTemplate`<div class="mb-10"></div>` : renderTemplate`${renderComponent($$result, "Divider", $$Divider, { "variant": "light", "classes": "mb-10 sm:mb-14" })}`}`;
}, "/Users/fbonvin/Developer/flavien-bonvin/src/layouts/page-header.astro", void 0);

export { $$PageHeader as $ };
