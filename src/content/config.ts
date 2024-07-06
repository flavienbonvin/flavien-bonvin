import { defineCollection, z } from "astro:content";

export enum BlogType {
    dev = "dev",
    beyond = "beyond",
}

const blog = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            category: z.nativeEnum(BlogType),
            publicationDate: z.coerce.date(),
            editDate: z.coerce.date().optional(),
            preview: z.boolean().optional(),
            tags: z.array(z.string()),
            readingTime: z.number(),
            ogImage: image(),
        }),
});

export const collections = {
    blog,
};
