import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { BlogType } from "content.config";

const sortArticles = (articles: CollectionEntry<"blog">[], limit?: number) => {
    return articles
        .sort((a, b) => {
            return b.data.publicationDate.getTime() - a.data.publicationDate.getTime();
        })
        .slice(0, limit ? limit : -1);
};

export const getAllPublishedArticles = async () => {
    return getCollection("blog", ({ data }) => {
        return !data.preview;
    }).then((articles) => {
        return sortArticles(articles);
    });
};

export const getDevArticles = async (limit?: number) => {
    return await getCollection("blog", ({ data }) => {
        return data.category === BlogType.dev;
    }).then((articles) => {
        return sortArticles(articles, limit);
    });
};

export const getBeyondArticle = async (limit?: number) => {
    return getCollection("blog", ({ data }) => {
        return data.category === BlogType.beyond;
    }).then((articles) => {
        return sortArticles(articles, limit);
    });
};

export const getArticleById = async (id: string) => {
    return getEntry("blog", id);
};
