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
                sans: ["Open Sans Variable", ...defaultTheme.fontFamily.sans],
                serif: ["Tinos", ...defaultTheme.fontFamily.serif],
            },
            colors: {
                background: "var(--background)",
                "font-color": "var(--font-color)",
                "font-color-muted": "var(--font-color-muted)",
                dev: "var(--dev)",
                musing: "var(--musing)",
                accent: "var(--accent)",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
