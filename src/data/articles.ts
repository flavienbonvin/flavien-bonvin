import { getCollection, type CollectionEntry } from "astro:content";
import { ArticleType } from "../interface";

export const getAllArticles = async () => {
    return await getCollection("articles");
};

const sortArticlesByPublicationDate = (
    a: CollectionEntry<"articles">,
    b: CollectionEntry<"articles">,
) => {
    return b.data.publicationDate.getTime() - a.data.publicationDate.getTime();
};

export const getDevArticles = async (limit?: number) => {
    const articles = await getAllArticles();

    return articles
        .filter((article) => article.data.type === ArticleType.DEV)
        .sort(sortArticlesByPublicationDate)
        .slice(0, limit);
};

export const getBeyondArticles = async (limit?: number) => {
    const articles = await getAllArticles();

    return articles
        .filter((article) => article.data.type === ArticleType.BEYOND)
        .sort(sortArticlesByPublicationDate)
        .slice(0, limit);
};
