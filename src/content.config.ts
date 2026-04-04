import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { ArticleType } from "./interface";

const articles = defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/articles" }),
    schema: z.object({
        title: z.string(),
        type: z.enum(ArticleType),
        publicationDate: z.coerce.date(),
    }),
});

export const collections = {
    articles,
};
