import { getCollection, getEntry } from "astro:content";
import { BlogType } from "content/config";

export const getAllPublishedArticles = () => {
    return getCollection("blog", ({ data }) => {
        return !data.preview;
    });
};

export const getArticle = (slug: string) => {
    return getEntry("blog", slug);
};

export const getDevArticles = () => {
    return getCollection("blog", ({ data }) => {
        return data.category === BlogType.dev;
    });
};

export const getNonDevArticles = () => {
    return getCollection("blog", ({ data }) => {
        return data.category === BlogType.musing;
    });
};
