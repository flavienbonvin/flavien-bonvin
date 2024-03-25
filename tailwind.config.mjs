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
                background: "hsl(var(--background))",
                "font-color": "hsl(var(--font-color))",
                "font-color-foreground": "hsl(var(--font-color-foreground))",
                "nav-active": "hsl(var(--nav-active))",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
