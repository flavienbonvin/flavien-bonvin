import rss from "@astrojs/rss";
import { getAllArticles } from "@data/articles";
import { marked } from "marked";
import xss from "xss";

export const GET = async ({ site }: { site: string | undefined }) => {
    const articles = await getAllArticles();
    if (!articles || !site) {
        return new Response("Not found", { status: 404 });
    }

    const articleContent = await Promise.all(
        articles.map(async (article) => {
            return marked.parse(article.body ?? "");
        }),
    );

    return rss({
        xmlns: { atom: "http://www.w3.org/2005/Atom" },
        title: "Flavien Bonvin blog",
        description:
            "Flavien Bonvin personal blog where I speak about web development and beyond.",
        site: site,
        items: articles.map((article, index) => ({
            title: article.data.title,
            author: `hello@flavienbonvin.com (Flavien Bonvin)`,
            pubDate: article.data.publicationDate,
            description: article.data.description,
            content: xss(articleContent[index]),
            link: `/articles/${article.id}`,
        })),
    });
};
