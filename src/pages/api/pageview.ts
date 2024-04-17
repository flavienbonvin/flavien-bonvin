import type { APIRoute } from "astro";

export const GET: APIRoute = ({ params, request }) => {
    console.log("API: pageView");

    return new Response(
        JSON.stringify({
            message: "Hello from the API",
            time: new Date().toISOString(),
        }),
    );
};
