import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { BlogType } from "content.config";

// Utility function to sort articles by date
const sortArticlesByDate = (articles: CollectionEntry<"blog">[]) => {
    return articles.sort((a, b) => {
        return b.data.publicationDate.getTime() - a.data.publicationDate.getTime();
    });
};

// Utility function to sort articles by series order
const sortArticlesBySeriesOrder = (articles: CollectionEntry<"blog">[]) => {
    return articles.sort((a, b) => 
        (a.data.series?.order || 0) - (b.data.series?.order || 0)
    );
};

// Blog article functions
export const getAllPublishedArticles = async (options = { includeSeries: true }) => {
    return await getCollection("blog", ({ data }) => {
        const isPublished = !data.preview;
        if (!options.includeSeries && data.series) {
            return false;
        }
        return isPublished;
    }).then((articles) => {
        return sortArticlesByDate(articles);
    });
};

export const getDevArticles = async () => {
    return await getCollection("blog", ({ data }) => {
        return data.category === BlogType.dev;
    }).then((articles) => {
        return sortArticlesByDate(articles);
    });
};

export const getBeyondArticles = async () => {
    return await getCollection("blog", ({ data }) => {
        return data.category === BlogType.beyond;
    }).then((articles) => {
        return sortArticlesByDate(articles);
    });
};

export const getArticleById = async (id: string) => {
    return await getEntry("blog", id);
};

// Series functions
export const getAllSeries = async () => {
    return await getCollection('series', ({ data }) => {
        return import.meta.env.PROD ? !data.draft : true;
    });
};

export const getSeries = async (seriesId: string) => {
    return await getEntry('series', seriesId);
};

export const getSeriesArticles = async (seriesId: string) => {
    return await getCollection('blog', ({ data }) => {
        // Filter by series ID
        return data.series?.id === seriesId;
    }).then((articles) => {
        return sortArticlesBySeriesOrder(articles);
    });
};

export const getCategorySeriesWithArticles = async (category: BlogType) => {
    const allSeries = await getAllSeries();
    const categorySeriesList = [];

    for (const series of allSeries) {
        const seriesArticles = await getSeriesArticles(series.id);
        const categoryArticlesCount = seriesArticles.filter(article => 
            article.data.category === category
        ).length;
        
        // If more than half of the articles are in this category, consider it a category series
        if (categoryArticlesCount > seriesArticles.length / 2) {
            categorySeriesList.push(series);
        }
    }

    return categorySeriesList;
};

export const getAllSeriesWithArticles = async () => {
    const allSeries = await getAllSeries();
    const result = [];

    for (const series of allSeries) {
        const articles = await getSeriesArticles(series.id);
        result.push({
            series,
            articles,
        });
    }

    return result;
};
