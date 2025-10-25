import { f as createAstro, c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_B0XwYhZu.mjs';
import { $ as $$PageLayout, a as $$ExternalLink } from '../chunks/page-layout_DslmWjCz.mjs';
import { $ as $$PageHeader } from '../chunks/page-header_PXmR3AKc.mjs';
import { $ as $$SeoPage } from '../chunks/seo-page_B2KipxEO.mjs';
import { $ as $$Icon } from '../chunks/Icon_C6tt3p34.mjs';
import { a as actions } from '../chunks/virtual_ByGdQket.mjs';
import { C as CONFIG, U as URLS } from '../chunks/const_TmsguLgQ.mjs';
import { i as isActionError } from '../chunks/shared_DMan-nII.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://flavienbonvin.com");
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const result = Astro2.getActionResult(actions.subscribeNewsletter);
  const actionError = isActionError(result?.error) ? result.error.message : false;
  const actionSuccess = result?.data?.success;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "hideFooter": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="flex flex-col"> <section> ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Subscribe to the newsletter", "noDivider": true }, { "default": ($$result3) => renderTemplate`No spam, no advertisement, just the article that you can read right from your
                inbox!` })} </section> <form method="POST"${addAttribute(actions.subscribeNewsletter, "action")} class="flex w-2/3 flex-col gap-4" id="newsletter-form"> <input required type="email" name="email" autocomplete="email" class="text-font-color ring-accent focus:ring-accent block w-full min-w-72 rounded-md border-0 text-sm ring-1 ring-inset placeholder:text-zinc-400 focus:ring-2 focus:ring-inset dark:bg-zinc-800 dark:ring-zinc-700" placeholder="Join 300+ web developers"> <button class="bg-accent w-full cursor-pointer rounded px-3.5 py-2.5 text-sm font-medium text-zinc-600 shadow transition-shadow duration-150 hover:shadow-md" type="submit">Subscribe</button> </form> ${actionError && renderTemplate`<p class="text-error mt-2">${actionError}</p>`} ${actionSuccess && renderTemplate`<p class="text-success mt-2">
🦆 Thanks for subscribing! Please check your inbox to confirm your email
</p>`} </div> <h2 class="mt-10 mb-8 font-serif text-lg font-medium tracking-tighter text-pretty sm:mt-20 sm:text-xl">
Or follow me on socials!
</h2> <div class="flex flex-row flex-wrap gap-x-3 gap-y-3"> ${renderComponent($$result2, "ExternalLink", $$ExternalLink, { "href": URLS.twitter, "classes": "flex w-36 items-center justify-center gap-2" }, { "default": ($$result3) => renderTemplate`Follow me on ${renderComponent($$result3, "Icon", $$Icon, { "name": "twitter" })}` })} ${renderComponent($$result2, "ExternalLink", $$ExternalLink, { "href": URLS.linkedin, "classes": "flex w-36 items-center justify-center gap-2" }, { "default": ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "name": "rss" })}LinkedIn` })} </div> `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "SeoPage", $$SeoPage, { "slot": "head", "title": CONFIG.author, "description": CONFIG.description })}` })}`;
}, "/Users/fbonvin/Developer/flavien-bonvin/src/pages/newsletter/index.astro", void 0);

const $$file = "/Users/fbonvin/Developer/flavien-bonvin/src/pages/newsletter/index.astro";
const $$url = "/newsletter";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
