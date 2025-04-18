export const prerender = false;

import { upsertPageView } from "@data/pageview";
import type { APIRoute } from "astro";

const responsInit = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
};

export const GET: APIRoute = async (data) => {
    const pathname = data.url.searchParams.get("pathname");

    // Unlighthouse user agent contains "moto g power"
    const potentiallyLighthouse = data.request.headers.get("User-Agent")?.includes("moto g power");
    if (!pathname || potentiallyLighthouse) {
        return new Response("", responsInit);
    }

    await upsertPageView(pathname);
    return new Response("", responsInit);
};
