import { PATHS } from "const";

export const getArticleLink = (slug: string) => `${PATHS.articles}/${slug}`;

export const getFormattedDate = (date: Date) => {
    return date.toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};
