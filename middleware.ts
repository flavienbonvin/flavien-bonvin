import { rewrite } from "@vercel/edge";

export default function middleware(request: Request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/plausible/js/script.js")) {
        return rewrite(new URL("https://plausible.io/js/script.js"));
    }

    if (url.pathname.startsWith("/plausible/api/event")) {
        return rewrite(new URL("https://plausible.io/api/event"));
    }
}
