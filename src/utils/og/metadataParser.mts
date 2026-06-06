import type { Article, Metadata } from "./interface";
import { readFileSync } from "node:fs";

const validateMetadata = (obj: unknown): obj is Metadata => {
    if (typeof obj !== "object" || obj === null) {
        return false;
    }

    const meta = obj as Record<string, unknown>;

    return (
        typeof meta.path === "string" &&
        typeof meta.fileName === "string" &&
        typeof meta.title === "string" &&
        typeof meta.readingTime === "string" &&
        typeof meta.type === "string" &&
        Array.isArray(meta.tags) &&
        meta.tags.every((tag) => typeof tag === "string")
    );
};

export const getArticleMetadata = (article: Article): Metadata => {
    const content = readFileSync(article.path, "utf-8");
    const match = content.match(/(?<=^---\n)([\s\S]*?)(?=\n^---)/m);
    if (!match) {
        throw new Error(`No metadata found for "${article.path}"`);
    }

    const lines = match[0].split("\n");
    const metadata: any = { path: article.path, fileName: article.fileName };

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) {
            continue;
        }

        const firstColon = trimmed.indexOf(":");
        if (firstColon === -1) {
            continue;
        }

        const key = trimmed.slice(0, firstColon).trim();
        const value = trimmed.slice(firstColon + 1).trim();

        if (key === "title" || key === "readingTime") {
            metadata[key] = value;
        } else if (key === "type") {
            metadata[key] = value.toLowerCase();
        } else if (key === "tags") {
            const removeBrackets = value.match(/(?<=\[)([\s\S]*?)(?=])/);
            if (removeBrackets) {
                metadata[key] = removeBrackets[0]
                    .split(",")
                    .map((tag) => tag.trim());
            }
        }
    }

    if (!validateMetadata(metadata)) {
        throw new Error(`Invalid metadata for "${article}"`);
    }

    return metadata;
};
