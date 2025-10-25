import { f as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, d as renderTemplate } from './astro/server_B0XwYhZu.mjs';
import 'clsx';

const $$Astro = createAstro("https://flavienbonvin.com");
const $$Divider = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Divider;
  const { variant = "default", classes } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<hr${addAttribute([
    "h-px border-0",
    variant === "default" && "bg-accent",
    variant === "light" && "bg-zinc-200 dark:bg-zinc-700",
    variant === "dev" && "bg-dev",
    variant === "beyond" && "bg-beyond",
    classes
  ], "class:list")}>`;
}, "/Users/fbonvin/Developer/flavien-bonvin/src/components/atoms/divider.astro", void 0);

export { $$Divider as $ };
