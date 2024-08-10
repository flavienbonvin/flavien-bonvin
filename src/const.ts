export const PATHS = {
    home: "/",
    about: "/about",
    articles: "/articles",
    dev: "/articles/dev",
    beyond: "/articles/beyond",
    newsletterValidate: "/newsletter/validate",
    newsletterValidated: "/newsletter/validated",
    error404: "/404",
} as const;

export const URLS = {
    twitter: "https://twitter.com/FlavienBonvin",
    github: "https://github.com/flavienbonvin",
    blogGithub: "https://github.com/flavienbonvin/flavien-bonvin",
    linkedin: "https://www.linkedin.com/in/flavien-b/",
    mailto: "mailto:hello@flavienbonvin.com",
} as const;

export const CONFIG = {
    author: "Flavien Bonvin",
    twitter: "FlavienBonvin",
    email: "hello@flavienbonvin.com",
    homeDescription: "Insights on coding and beyond. Explore my world.",
    devDescription: "Mastering web development. Join my journey.",
    beyondDescription: "Life outside of coding. Discover my interests.",
    description:
        "Explore the world of web development and beyond of Flavien Bonvin. From coding to coffee machines, and productivity tools, discover Flavien's passions.",
} as const;

export const articleCardWidth = "sm:w-5/6 md:w-4/5";
