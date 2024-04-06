export const PATHS = {
    home: "/",
    about: "/about",
    articles: "/articles",
    dev: "/articles/dev",
    beyond: "/articles/beyond",
} as const;

export const CONFIG = {
    author: "Flavien Bonvin",
    twitter: "FlavienBonvin",
    description:
        "Flavien Bonvin blog where you I write about software development, and any other topic that spark my interest.",
} as const;

export const articleCardWidth = "sm:w-5/6 md:w-4/5";
