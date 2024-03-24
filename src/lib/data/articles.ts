import { getCollection, getEntry } from "astro:content";

export const getAllPublishedArticles = () => {
    return getCollection("blog", ({ data }) => {
        return !data.preview;
    });
};

export const getArticle = (slug: string) => {
    return getEntry("blog", slug);
};
