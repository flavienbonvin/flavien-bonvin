import plugin from "tailwindcss/plugin";

module.exports = plugin(function ({ addUtilities }) {
    addUtilities({
        ".font-thin": {
            fontWeight: "100",
            fontVariationSettings: '"wght" 100',
        },
    });

    addUtilities({
        ".font-extralight": {
            fontWeight: "200",
            fontVariationSettings: '"wght" 200',
        },
    });

    addUtilities({
        ".font-light": {
            fontWeight: "300",
            fontVariationSettings: '"wght" 300',
        },
    });

    addUtilities({
        ".font-normal": {
            fontWeight: "400",
            fontVariationSettings: '"wght" 400',
        },
    });

    addUtilities({
        ".font-medium": {
            fontWeight: "500",
            fontVariationSettings: '"wght" 500',
        },
    });

    addUtilities({
        ".font-semibold": {
            fontWeight: "600",
            fontVariationSettings: '"wght" 600',
        },
    });

    addUtilities({
        ".font-bold": {
            fontWeight: "700",
            fontVariationSettings: '"wght" 700',
        },
    });

    addUtilities({
        ".font-extrabold": {
            fontWeight: "800",
            fontVariationSettings: '"wght" 800',
        },
    });

    addUtilities({
        ".font-black": {
            fontWeight: "900",
            fontVariationSettings: '"wght" 900',
        },
    });
});
