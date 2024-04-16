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
                gradient: {
                    dev1: "var(--dev1)",
                    dev2: "var(--dev2)",
                    dev3: "var(--dev3)",
                    dev4: "var(--dev4)",
                    dev5: "var(--dev5)",
                    dev6: "var(--dev6)",
                    beyond1: "var(--beyond1)",
                    beyond2: "var(--beyond2)",
                    beyond3: "var(--beyond3)",
                    beyond4: "var(--beyond4)",
                    beyond5: "var(--beyond5)",
                    beyond6: "var(--beyond6)",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("./src/lib/helpers/fontVariationPlugin")],
};
