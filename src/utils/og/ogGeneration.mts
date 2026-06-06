import { getArticleMetadata } from "./metadataParser.mts";
import { getArticlePath } from "./articleParser.mts";

const ogGeneration = () => {
    const articlesPaths = getArticlePath();
    const articleMetadata = articlesPaths.map((article) => {
        return getArticleMetadata(article);
    });

    console.log(articleMetadata);
};

ogGeneration();
