import rss from "@astrojs/rss";
import { getAllPublishedArticles } from "@data/articles";
import { getArticleLink } from "@helpers/article";

export const GET = async ({ site }: { site: string | undefined }) => {
    const articles = await getAllPublishedArticles();
    if (!articles || !site) {
        return {
            status: 404,
            error: "Not found",
        };
    }

    return rss({
        title: "Flavien Bonvin",
        description: "Flavien Bonvin's blog",
        site: site,
        items: articles.map((article) => ({
            title: article.data.title,
            pubDate: article.data.publicationDate,
            link: getArticleLink(article.data.slug),
        })),
    });
};
