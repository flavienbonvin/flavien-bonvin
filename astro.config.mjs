import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import embeds from "astro-embed/integration";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "https://flavien-bonvin.vercel.app/",
    integrations: [
        tailwind(),
        sitemap(),
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
    ],
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: "dracula",
        },
    },
});
