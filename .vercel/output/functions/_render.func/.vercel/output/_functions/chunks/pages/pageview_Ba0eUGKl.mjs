import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN ?? "43b3c8a8e24bac01eef1c07428a9d7f7476a46d2:qhxqnbrlud16bxwhpn9iar89fxot", {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://flavien-bonvin.vercel.app/", "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const PageView = asDrizzleTable("PageView", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "PageView", "primaryKey": true } }, "pathname": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "pathname", "collection": "PageView", "primaryKey": false, "optional": false } }, "count": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "count", "collection": "PageView", "primaryKey": false, "optional": false, "default": 1 } } }, "deprecated": false, "indexes": {} }, false);

const getPageView = async (pathname) => {
  return await db.select({ count: PageView.count }).from(PageView).where(eq(PageView.pathname, pathname));
};
const createPageView = async (pathname) => {
  await db.insert(PageView).values({
    pathname
  });
};
const updatePageViewCount = async (pathname, count) => {
  await db.update(PageView).set({ count }).where(eq(PageView.pathname, pathname));
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
  const pageView = await getPageView(pathname);
  if (pageView.length > 0) {
    await updatePageViewCount(pathname, pageView[0].count + 1);
  } else {
    await createPageView(pathname);
  }
  return new Response("", responsInit);
};

export { GET, prerender };
