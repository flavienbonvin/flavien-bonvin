import { PATHS } from "const";

export const getArticleLink = (slug: string) => `${PATHS.articles}/${slug}`;

export const getFormattedDate = (date?: Date) => {
    if (!date) {
        return null;
    }

    return date.toLocaleDateString("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};
