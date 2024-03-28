import rss from "@astrojs/rss";
import { getAllPublishedArticles } from "@data/articles";
import { getArticleLink } from "@helpers/article";
import MarkdownIt from "markdown-it";
import sanitize from "sanitize-html";
const parser = new MarkdownIt();

export const GET = async ({ site }: { site: string | undefined }) => {
    const articles = await getAllPublishedArticles();
    if (!articles || !site) {
        return {
            status: 404,
            error: "Not found",
        };
    }

    // TODO update site description
    return rss({
        title: "Flavien Bonvin",
        description: "Flavien Bonvin's blog",
        site: site,
        items: articles.map((article) => ({
            title: article.data.title,
            pubDate: article.data.publicationDate,
            description: sanitize(article.body).slice(0, 150).trim().concat("..."),
            content: sanitize(parser.render(article.body)),
            link: getArticleLink(article.data.slug),
        })),
    });
};
