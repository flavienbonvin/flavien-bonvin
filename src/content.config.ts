import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

export enum BlogType {
    dev = "dev",
    beyond = "beyond",
}

const blog = defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.nativeEnum(BlogType),
        publicationDate: z.coerce.date(),
        editDate: z.coerce.date().optional(),
        preview: z.boolean().optional(),
        tags: z.array(z.string()),
        readingTime: z.number(),
    }),
});

export const collections = {
    blog,
};
