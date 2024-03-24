/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                background: "hsl(208.4, 25.3%, 14.7%)",
                "font-color": "hsl(222, 11%, 91%)",
                "font-color-foreground": "hsl(60, 11%, 98%)",
                "nav-active": "hsl(27, 90% , 88%)",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
