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
        xmlns: { atom: "http://www.w3.org/2005/Atom" },
        title: CONFIG.homeDescription,
        description: CONFIG.description,
        site: site,
        items: articles.map((article) => ({
            title: article.data.title,
            author: `${CONFIG.email} (${CONFIG.author})`,
            pubDate: article.data.editDate ?? article.data.publicationDate,
            description: article.data.description,
            content: sanitize(parser.render(article?.body ?? "")),
            link: getArticleLink(article.id),
        })),
    });
};
