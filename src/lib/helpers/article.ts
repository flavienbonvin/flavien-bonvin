import { PATHS } from "const";

export const getArticleLink = (slug: string) => `${PATHS.articles}/${slug}`;

export const getFormattedDate = (date: string) => {
    return new Date(date).toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};
