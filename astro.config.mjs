// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    output: "static",
    adapter: cloudflare(),
    site: "https://flavienbonvin.com",
    integrations: [sitemap()],

    vite: {
        plugins: [tailwindcss()],
    },

    fonts: [
        {
            provider: fontProviders.local(),
            name: "Swiss works",
            cssVariable: "--font-swiss-works",
            options: {
                variants: [
                    {
                        src: ["./src/assets/fonts/SuisseWorks-Bold-WebS.woff2"],
                        weight: "700",
                    },
                    {
                        src: [
                            "./src/assets/fonts/SuisseWorks-BoldItalic-WebS.woff2",
                        ],
                        style: "italic",
                        weight: "700",
                    },
                    {
                        src: [
                            "./src/assets/fonts/SuisseWorks-Medium-WebS.woff2",
                        ],
                        weight: "500",
                    },
                    {
                        src: [
                            "./src/assets/fonts/SuisseWorks-MediumItalic-WebS.woff2",
                        ],
                        style: "italic",
                        weight: "500",
                    },
                    {
                        src: [
                            "./src/assets/fonts/SuisseWorks-Regular-WebS.woff2",
                        ],
                        weight: "400",
                    },
                    {
                        src: [
                            "./src/assets/fonts/SuisseWorks-RegularItalic-WebS.woff2",
                        ],
                        style: "italic",
                        weight: "400",
                    },
                ],
            },
            fallbacks: [
                "Georgia",
                "Cambria",
                "Times New Roman",
                "Times",
                "serif",
            ],
        },
        {
            provider: fontProviders.local(),
            name: "Berkeley mono",
            cssVariable: "--font-berkeley-mono",
            options: {
                variants: [
                    {
                        src: ["./src/assets/fonts/BerkeleyMono-Regular.woff2"],
                        weight: "400",
                    },
                    {
                        src: [
                            "./src/assets/fonts/BerkeleyMono-Regular-Oblique.woff2",
                        ],
                        style: "italic",
                        weight: "400",
                    },
                    {
                        src: ["./src/assets/fonts/BerkeleyMono-Medium.woff2"],
                        weight: "500",
                    },
                    {
                        src: [
                            "./src/assets/fonts/BerkeleyMono-Medium-Oblique.woff2",
                        ],
                        weight: "500",
                        style: "italic",
                    },
                    {
                        src: ["./src/assets/fonts/BerkeleyMono-Bold.woff2"],
                        weight: "700",
                    },
                    {
                        src: [
                            "./src/assets/fonts/BerkeleyMono-Bold-Oblique.woff2",
                        ],
                        weight: "700",
                        style: "italic",
                    },
                ],
            },
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
});
