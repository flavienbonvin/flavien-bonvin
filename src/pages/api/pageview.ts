export const prerender = false;

import { createPageView, getPageView, updatePageViewCount } from "@data/pageview";
import type { APIRoute } from "astro";

const responsInit = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
};

export const GET: APIRoute = async (data) => {
    // Unlighthouse user agent contains "moto g power"
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
