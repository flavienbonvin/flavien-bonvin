import rss from "@astrojs/rss";
import { getAllPublishedArticles } from "@data/articles";
import { getArticleLink } from "@helpers/article";
import { CONFIG } from "const";
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

    return rss({
        title: CONFIG.author,
        description: CONFIG.description,
        site: site,
        items: articles.map((article) => ({
            title: article.data.title,
            pubDate: article.data.publicationDate,
            description: sanitize(article.body).slice(0, 150).trim().concat("..."),
            content: sanitize(parser.render(article.body)),
            link: getArticleLink(article.slug),
        })),
    });
};
