import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { ArticleType } from "./interface";

const articles = defineCollection({
    loader: glob({ pattern: "*.{md,mdx}", base: "./src/articles" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        type: z.enum(ArticleType),
        publicationDate: z.coerce.date(),
        readingTime: z.number(),
        tags: z.array(z.string()),
    }),
});

export const collections = {
    articles,
};
