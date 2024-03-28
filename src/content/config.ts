import { defineCollection, z } from "astro:content";

export enum BlogType {
    dev = "dev",
    musing = "musing",
}

const blogCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        category: z.nativeEnum(BlogType),
        publicationDate: z.string(),
        preview: z.boolean().optional(),
        tags: z.array(z.string()),
    }),
});

export const collection = {
    blog: blogCollection,
};
