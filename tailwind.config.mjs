import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        container: {
            center: true,
        },
        extend: {
            fontFamily: {
                sans: ["Space Grotesk Variable", ...defaultTheme.fontFamily.sans],
                serif: ["Bitter", ...defaultTheme.fontFamily.serif],
                mono: ["iA Writer Mono", ...defaultTheme.fontFamily.mono],
            },
            colors: {
                background: "var(--background)",
                "font-color": "var(--font-color)",
                "font-color-muted": "var(--font-color-muted)",
                dev: "var(--dev)",
                beyond: "var(--beyond)",
                accent: "var(--accent)",
                interactive: "var(--interactive)",
                "interactive-active": "var(--interactive-active)",
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("./src/lib/helpers/fontVariationPlugin")],
};
