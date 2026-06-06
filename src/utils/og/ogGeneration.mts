import { getArticleMetadata } from "./metadataParser.mts";
import { getArticlePath } from "./articleParser.mts";
import { generateAndWriteImages } from "./imageCreation.mts";
import { createOGFolder } from "./fileParser.mts";

const ogGeneration = () => {
    const articlesPaths = getArticlePath();
    const articleMetadata = articlesPaths.map((article) => {
        return getArticleMetadata(article);
    });

    createOGFolder();
    generateAndWriteImages(articleMetadata);
};

ogGeneration();
