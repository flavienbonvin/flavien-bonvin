import { getCollection } from "astro:content";
import { ArticleType } from "../interface";

export const getAllArticles = async () => {
    return await getCollection("articles");
};

export const getDevArticles = async () => {
    const articles = await getAllArticles();

    return articles.filter((article) => article.data.type === ArticleType.DEV);
};

export const getBeyondArticles = async () => {
    const articles = await getAllArticles();

    return articles.filter(
        (article) => article.data.type === ArticleType.BEYOND,
    );
};
