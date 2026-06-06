import satori from "satori";
import { getFonts, getImagePath } from "./fileParser.mts";
import type { Metadata } from "./interface";
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "fs";

const FONTS = getFonts();

export const generateSVG = async (metadata: Metadata) => {
    const svg = await satori(`<p>${metadata.title}</p>`, {
        width: 1200,
        height: 630,
        fonts: [
            {
                name: "Inter",
                data: FONTS[0],
                weight: 400,
                style: "normal",
            },
        ],
    });

    return svg;
};

export const generateAndWriteImages = async (articleMetadata: Metadata[]) => {
    for (const metadata of articleMetadata) {
        const svg = await generateSVG(metadata);
        const png = new Resvg(svg).render().asPng();

        const path = getImagePath(metadata);
        writeFileSync(path, png);
    }
};
