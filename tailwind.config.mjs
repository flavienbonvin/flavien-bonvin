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
                serif: ["Suisse Works", ...defaultTheme.fontFamily.serif],
                mono: ["iA Writer Mono", ...defaultTheme.fontFamily.mono],
            },
            colors: {
                input: "var(--input)",
                background: "var(--background)",
                "font-color": "var(--font-color)",
                "font-color-muted": "var(--font-color-muted)",
                dev: "var(--dev)",
                beyond: "var(--beyond)",
                accent: "var(--accent)",
                interactive: "var(--interactive)",
                "interactive-active": "var(--interactive-active)",
                success: "var(--success)",
                error: "var(--error)",
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
            animation: {
                "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "gentle-slide": "gentleSlide 1.5s ease-in-out 2 forwards",
            },
            keyframes: {
                fadeInUp: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(40px)",
                        filter: "blur(4px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                        filter: "blur(0)",
                    },
                },
                gentleSlide: {
                    "0%": { transform: "translateX(0)", opacity: "1" },
                    "50%": { transform: "translateX(4px)", opacity: "0.8" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
            },
        },
    },
    safelist: ["opacity-100", "text-success", "text-error"],
    plugins: [require("@tailwindcss/typography")],
};
