import { ImageResponse } from "@vercel/og";
import { type CollectionEntry } from "astro:content";
import { readFileSync } from "fs";
import { resolve } from "path";

export const getArticleOG = async (article: CollectionEntry<"blog">) => {
    const postCover = readFileSync(resolve("./public/article-og.png"));
    const fontData = readFileSync(resolve("./public/fonts/open-sans-600.ttf"));

    const html = {
        type: "div",
        props: {
            tw: "w-full h-full flex relative",
            children: [
                {
                    type: "div",
                    props: {
                        tw: "w-[1920px] h-[1080px] flex",
                        children: [
                            {
                                type: "img",
                                props: {
                                    src: postCover.buffer,
                                },
                            },
                        ],
                    },
                },
                {
                    type: "p",
                    props: {
                        tw: "text-font-color h-full flex items-center absolute ml-[100px] max-w-[1820px]",
                        children: [
                            {
                                type: "div",
                                props: {
                                    style: {
                                        fontSize: "90px",
                                    },
                                    children: article.data.title,
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };

    return new ImageResponse(html, {
        width: 1920,
        height: 1080,
        fonts: [
            {
                name: "Open Sans",
                data: fontData.buffer,
                style: "normal",
            },
        ],
    });
};
