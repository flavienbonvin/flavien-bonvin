import { f as createAstro, c as createComponent } from '../../chunks/astro/server_B0XwYhZu.mjs';
import 'clsx';
import { R as RESEND_API_KEY, g as getSubscriptionFromToken, d as deleteSubscription, B as BLOG_AUDIENCE_ID } from '../../chunks/server_DXaUye4Z.mjs';
import { i as isDateSmallerThan30Minutes } from '../../chunks/date_C0q6oiwo.mjs';
import { Resend } from 'resend';
import '../../chunks/page-layout_DslmWjCz.mjs';
import '../../chunks/seo-page_B2KipxEO.mjs';
import { R as ROUTES } from '../../chunks/const_TmsguLgQ.mjs';
export { renderers } from '../../renderers.mjs';

const audienceId = BLOG_AUDIENCE_ID;
const resend = new Resend(RESEND_API_KEY);
const validateNewsletterSubscription = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }
  const subscription = await getSubscriptionFromToken(token);
  if (!subscription) {
    throw new Error("Invalid token");
  }
  const isSubscriptionValid = isDateSmallerThan30Minutes(subscription?.createdAt);
  if (!isSubscriptionValid) {
    await deleteSubscription(token);
    throw new Error("Subscription is too old");
  }
  await createNewContact(subscription.email);
  await deleteSubscription(token);
};
const createNewContact = async (email) => {
  await resend.contacts.create({
    email,
    audienceId
  });
};

const $$Astro = createAstro("https://flavienbonvin.com");
const prerender = false;
const $$Validate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Validate;
  async function validateSubscription() {
    try {
      const token = Astro2.url.searchParams.get("token") ?? void 0;
      await validateNewsletterSubscription(token);
      return ROUTES.newsletterValidated;
    } catch {
      return ROUTES.error404;
    }
  }
  return Astro2.redirect(await validateSubscription());
}, "/Users/fbonvin/Developer/flavien-bonvin/src/pages/newsletter/validate.astro", void 0);

const $$file = "/Users/fbonvin/Developer/flavien-bonvin/src/pages/newsletter/validate.astro";
const $$url = "/newsletter/validate";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Validate,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
