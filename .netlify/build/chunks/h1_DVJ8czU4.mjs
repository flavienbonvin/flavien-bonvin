import { f as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, g as renderSlot, d as renderTemplate } from './astro/server_B0XwYhZu.mjs';
import 'clsx';

const $$Astro = createAstro("https://flavienbonvin.com");
const $$H1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$H1;
  return renderTemplate`${maybeRenderHead()}<h1${addAttribute(["tracking-tight", Astro2.props.classes], "class:list")}> ${renderSlot($$result, $$slots["default"])} </h1>`;
}, "/Users/fbonvin/Developer/flavien-bonvin/src/components/atoms/h1.astro", void 0);

export { $$H1 as $ };
