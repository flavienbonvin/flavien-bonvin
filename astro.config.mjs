import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import embeds from "astro-embed/integration";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
    output: "hybrid",
    site: "https://flavienbonvin.com",
    integrations: [
        tailwind(),
        sitemap({
            filter: ({ pathname }) =>
                pathname !== "/newsletter/validate" && pathname !== "/newsletter/validated",
        }),
        embeds({
            services: {
                LinkPreview: false,
            },
        }),
        mdx({
            syntaxHighlight: "shiki",
            shikiConfig: {
                theme: "dracula",
            },
        }),
        icon(),
        db(),
    ],
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: "dracula",
        },
    },
    adapter: vercel(),
});
