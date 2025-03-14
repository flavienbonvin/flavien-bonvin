import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { BlogType } from "content.config";

const sortArticles = (articles: CollectionEntry<"blog">[]) => {
    return articles.sort((a, b) => {
        return b.data.publicationDate.getTime() - a.data.publicationDate.getTime();
    });
};

export const getAllPublishedArticles = async () => {
    return getCollection("blog", ({ data }) => {
        return !data.preview;
    }).then((articles) => {
        return sortArticles(articles);
    });
};

export const getDevArticles = async () => {
    return await getCollection("blog", ({ data }) => {
        return data.category === BlogType.dev;
    }).then((articles) => {
        return sortArticles(articles);
    });
};

export const getBeyondArticle = async () => {
    return getCollection("blog", ({ data }) => {
        return data.category === BlogType.beyond;
    }).then((articles) => {
        return sortArticles(articles);
    });
};

export const getArticleById = async (id: string) => {
    return getEntry("blog", id);
};
