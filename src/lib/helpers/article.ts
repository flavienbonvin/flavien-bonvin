import { PATHS } from "const";

export const getArticleLink = (slug: string) => `${PATHS.articles}/${slug}`;

export const getFormattedDate = (date?: Date, dateOnly?: boolean) => {
    if (!date) {
        return null;
    }

    if (dateOnly) {
        return date.toLocaleDateString("en", {});
    }

    return date.toLocaleDateString("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};
