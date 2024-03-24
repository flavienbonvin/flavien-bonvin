import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        dev: z.boolean(),
        publicationDate: z.string(),
        preview: z.boolean().optional(),
        tags: z.array(z.string()),
    }),
});

export const collection = {
    blog: blogCollection,
};
