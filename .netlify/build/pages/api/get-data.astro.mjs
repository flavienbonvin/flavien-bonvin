import { d as db, P as PageView } from '../../chunks/_astro_db_B6CXwIM4.mjs';
import { sql } from '@astrojs/db/dist/runtime/virtual.js';
export { renderers } from '../../renderers.mjs';

const upsertPageView = async (pathname) => {
  await db.insert(PageView).values({ pathname, count: 1 }).onConflictDoUpdate({
    target: PageView.pathname,
    set: { count: sql`${PageView.count} + 1` }
  });
};

const prerender = false;
const responsInit = {
  status: 200,
  headers: {
    "Content-Type": "application/json"
  }
};
const GET = async (data) => {
  const pathname = data.url.searchParams.get("pathname");
  const potentiallyLighthouse = data.request.headers.get("User-Agent")?.includes("moto g power");
  if (!pathname || potentiallyLighthouse) {
    return new Response("", responsInit);
  }
  await upsertPageView(pathname);
  return new Response("", responsInit);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
