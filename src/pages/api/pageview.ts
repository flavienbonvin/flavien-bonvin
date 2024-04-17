export const prerender = false;

import type { APIRoute } from "astro";

const responsInit = {
    status: 200,
    headers: {
        "Content-Type": "application/json",
    },
};

export const GET: APIRoute = async (data) => {
    const pathname = data.url.searchParams.get("pathname");
    if (!pathname) {
        return new Response("", responsInit);
    }

    return new Response("", responsInit);
};
