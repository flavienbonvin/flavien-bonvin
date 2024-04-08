export const PATHS = {
    home: "/",
    about: "/about",
    articles: "/articles",
    dev: "/articles/dev",
    beyond: "/articles/beyond",
} as const;

export const URLS = {
    twitter: "https://twitter.com/FlavienBonvin",
    github: "https://github.com/flavienbonvin",
    linkedin: "https://www.linkedin.com/in/flavien-b/",
    mailto: "mailto:hello@flavienbonvin.com",
} as const;

export const CONFIG = {
    author: "Flavien Bonvin",
    twitter: "FlavienBonvin",
    homeDescription: "Insights on coding and beyond. Explore my world.",
    devDescription: "Mastering web development. Join my journey.",
    beyondDescription: "Life outside of coding. Discover my interests.",
    description:
        "Explore the world of web development and beyond with Flavien Bonvin. From coding to coffee machines, productivity tools to life adventures, discover Flavien's insights and passions.",
} as const;

export const articleCardWidth = "sm:w-5/6 md:w-4/5";
