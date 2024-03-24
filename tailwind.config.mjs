/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                background: "hsl(208.4, 25.3%, 14.7%)",
                "font-color": "hsl(222, 11%, 91%)",
                "font-color-foreground": "hsl(222, 20%, 95%)"
            }
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
