import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

export enum BlogType {
    dev = "dev",
    beyond = "beyond",
}

// Series collection
const series = defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/series" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        coverImage: z.string().optional(),
        publicationDate: z.coerce.date(),
        draft: z.boolean().default(false),
    }),
});

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
        // Add series relation - using string for now to debug
        series: z.object({
            id: z.string(),
            order: z.number(),
        }).optional(),
    }),
});

export const collections = {
    blog,
    series,
};
