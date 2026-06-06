import { createServer, IncomingMessage, ServerResponse } from "http";
import { getArticlePath } from "./articleParser.mts";
import { getArticleMetadata } from "./metadataParser.mts";
import { generateSVG } from "./imageCreation.mts";
import { watch } from "fs";
import { getOGDirFolder } from "./fileParser.mts";

const IMAGE_GEN = getOGDirFolder();
let clients: Set<ServerResponse> = new Set();

watch(IMAGE_GEN, (event) => {
    if (event !== "change") {
        return;
    }

    const message = `data: {"type":"reload"}\n\n`;
    for (const client of clients) {
        try {
            client.write(message);
        } catch (e) {
            clients.delete(client);
        }
    }
});

const server = createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
        if (req.url === "/events") {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            clients.add(res);

            req.on("close", () => {
                clients.delete(res);
            });

            return;
        }

        if (req.url === "/") {
            const paths = getArticlePath();
            const random = paths[Math.floor(Math.random() * paths.length)];
            const metadata = getArticleMetadata(random);
            const svg = await generateSVG(metadata);

            const html = `
            <!DOCTYPE html>
                  <html>
                    <head>
                      <title>SVG Viewer</title>
                    </head>
                    <body>
                      <h1>Generated SVG</h1>
                      ${svg}
                      <script>
                        const eventSource = new EventSource('/events');
                        eventSource.onmessage = (event) => {
                            setTimeout(() => {
                                location.reload();
                            }, 500);
                        };
                      </script>
                    </body>
                  </html>
            `;

            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
            return;
        }
    },
);

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
