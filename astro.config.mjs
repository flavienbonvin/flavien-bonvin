import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import embeds from "astro-embed/integration";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
    output: "static",
    site: "https://flavienbonvin.com",
    vite: {
        plugins: [tailwindcss()],
    },
    experimental: {
        fonts: [
            {
                provider: fontProviders.google(),
                name: "Open Sans",
                cssVariable: "--font-open-sans",
                subsets: ["latin"],
                fallbacks: [
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                ],
            },
            {
                provider: "local",
                name: "Swiss works",
                cssVariable: "--font-swiss-works",
                variants: [
                    { src: ["./src/assets/fonts/SuisseWorks-Bold-WebS.woff2"] },
                    { src: ["./src/assets/fonts/SuisseWorks-BoldItalic-WebS.woff2"] },
                    { src: ["./src/assets/fonts/SuisseWorks-Medium-WebS.woff2"] },
                    { src: ["./src/assets/fonts/SuisseWorks-MediumItalic-WebS.woff2"] },
                    { src: ["./src/assets/fonts/SuisseWorks-Regular-WebS.woff2"] },
                    { src: ["./src/assets/fonts/SuisseWorks-RegularItalic-WebS.woff2"] },
                ],
                fallbacks: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
            },
            {
                provider: "local",
                name: "Berkeley mono",
                cssVariable: "--font-berkeley-mono",
                variants: [{ src: ["./src/assets/fonts/BerkeleyMono-Regular.woff2"] }],
                fallbacks: [
                    "Menlo",
                    "Monaco",
                    "Consolas",
                    "Liberation Mono",
                    "Courier New",
                    "monospace",
                ],
            },
        ],
    },
    integrations: [
        sitemap({
            filter: (page) =>
                page !== "https://flavienbonvin.com/newsletter/validate/" &&
                page !== "https://flavienbonvin.com/newsletter/validated/",
        }),
        embeds({
            services: {
                LinkPreview: false,
            },
        }),
        mdx({
            syntaxHighlight: "shiki",
            shikiConfig: {
                themes: {
                    light: "one-light",
                    dark: "github-dark-default",
                },
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
    redirects: {
        "/reduce-next-js-bundle/": "/articles/reduce-next-js-bundle",
        "/amazing-nextjs-libraries-that-makes-coding-easier/":
            "/articles/amazing-nextjs-libraries-that-makes-coding-easier",
        "/what-makes-the-us-ansi-keyboard-is-the-best-layout-for-developers/":
            "/articles/what-makes-the-us-ansi-keyboard-is-the-best-layout-for-developers",
        "/quit-spotlight-and-alfred-10-best-raycast-extensions-for-web-developers/":
            "/articles/quit-spotlight-and-alfred-10-best-raycast-extensions-for-web-developers",
        "/how-tana-made-me-choose-obsidian-as-my-note-taking-app-and-its-amazing/":
            "/articles/how-tana-made-me-choose-obsidian-as-my-note-taking-app-and-its-amazing",
        "/slow-software-a-sign-of-appreciation-for-developers/":
            "/articles/slow-software-appreciation-for-developers",
        "/some-great-slow-software-companies/":
            "/articles/slow-software-great-slow-software-companies",
    },
});
