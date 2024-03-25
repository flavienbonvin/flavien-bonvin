export const isDarkMode = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
