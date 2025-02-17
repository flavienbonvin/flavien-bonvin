import { getArticleOG } from "@components/article-og/getArticleOG";
import { getCollection, type CollectionEntry } from "astro:content";

interface Props {
    params: { slug: string };
    props: { article: CollectionEntry<"blog"> };
}

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
    const blogPosts = await getCollection("blog");
    return blogPosts.map((article) => ({
        params: { slug: article.id },
        props: { article },
    }));
}

export async function GET({ props }: Props) {
    return await getArticleOG(props.article);
}
