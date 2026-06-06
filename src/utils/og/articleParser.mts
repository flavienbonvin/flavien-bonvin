import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync, readdirSync } from "node:fs";
import type { Article } from "./interface";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PROJECT = join(ROOT, "../../..");
const ARTICLES_DIR = join(PROJECT, "src/articles");

export const getArticlePath = (): Article[] => {
    if (!existsSync(ARTICLES_DIR)) {
        return [];
    }

    const articles = readdirSync(ARTICLES_DIR);
    return articles.map((article) => {
        return { path: join(ARTICLES_DIR, article), fileName: article };
    });
};
