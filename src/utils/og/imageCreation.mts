import satori from "satori";
import { getFonts, getImagePath } from "./fileParser.mts";
import type { Metadata } from "./interface";
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "fs";
import { getImageMarkup } from "./imageMarkup.mts";

const FONTS = getFonts();

export const generateSVG = async (metadata: Metadata) => {
    const svg = await satori(getImageMarkup(metadata), {
        width: 1200,
        height: 630,
        fonts: [
            {
                name: "Inter",
                data: FONTS.inter,
                weight: 400,
                style: "normal",
            },
            {
                name: "Lora",
                data: FONTS.lora,
                weight: 700,
                style: "normal",
            },
            {
                name: "IBMPlexMono",
                data: FONTS.iBMPlexMono,
                weight: 400,
                style: "normal",
            },
            {
                name: "IBMPlexMono",
                data: FONTS.iBMPlexMonoSemiBold,
                weight: 600,
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
