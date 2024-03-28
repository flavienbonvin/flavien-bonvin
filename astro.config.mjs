import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://www.flavienbonvin.com/",
    integrations: [
        tailwind(),
        sitemap(),
        mdx({
            syntaxHighlight: "shiki",
            shikiConfig: {
                theme: "dracula",
            },
        }),
        icon(),
    ],
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: "dracula",
        },
    },
});
