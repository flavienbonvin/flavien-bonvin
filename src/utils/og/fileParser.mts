import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import type { Article, Metadata } from "./interface";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PROJECT = join(ROOT, "../../..");

const ARTICLES_DIR = join(PROJECT, "src/articles");
const FONT_DIR = join(PROJECT, "src/assets/fonts");
const IMAGES_DIR = join(PROJECT, "public/og");
const OG_DIR = join(PROJECT, "src/utils/og");

export const getArticlePath = (): Article[] => {
    if (!existsSync(ARTICLES_DIR)) {
        return [];
    }

    const articles = readdirSync(ARTICLES_DIR);
    return articles.map((article) => {
        return { path: join(ARTICLES_DIR, article), fileName: article };
    });
};

export const getFonts = () => {
    return {
        inter: readFileSync(join(FONT_DIR, "Inter.ttf")),
        lora: readFileSync(join(FONT_DIR, "Lora.ttf")),
        iBMPlexMono: readFileSync(join(FONT_DIR, "IBMPlexMono.ttf")),
        iBMPlexMonoSemiBold: readFileSync(
            join(FONT_DIR, "IBMPlexMono-SemiBold.ttf"),
        ),
    };
};

export const getImagePath = (metadata: Metadata) => {
    const path = metadata.fileName.replace(/\.mdx?$/, ".png");
    return join(IMAGES_DIR, path);
};

export const createOGFolder = () => {
    if (!existsSync(IMAGES_DIR)) {
        mkdirSync(IMAGES_DIR, { recursive: true });
    }
};

export const getOGDirFolder = () => {
    return OG_DIR;
};
