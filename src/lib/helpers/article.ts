import { ROUTES } from "const";

export const getArticleLink = (slug: string) => `${ROUTES.articles}/${slug}`;

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
