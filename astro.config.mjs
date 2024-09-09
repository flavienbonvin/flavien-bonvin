import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import embeds from "astro-embed/integration";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import db from "@astrojs/db";

import webVitals from "@astrojs/web-vitals";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://flavienbonvin.com",
  integrations: [tailwind(), sitemap({
    filter: page => page !== "https://flavienbonvin.com/newsletter/validate/" && page !== "https://flavienbonvin.com/newsletter/validated/"
  }), embeds({
    services: {
      LinkPreview: false
    }
  }), mdx({
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "dracula"
    }
  }), icon(), db(), webVitals()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "dracula"
    }
  },
  adapter: vercel(),
  redirects: {
    "/reduce-next-js-bundle/": {
      destination: "/articles/reduce-next-js-bundle",
      status: 301
    },
    "/amazing-nextjs-libraries-that-makes-coding-easier/": {
      destination: "/articles/amazing-nextjs-libraries-that-makes-coding-easier",
      status: 301
    },
    "/what-makes-the-us-ansi-keyboard-is-the-best-layout-for-developers/": {
      destination: "/articles/what-makes-the-us-ansi-keyboard-is-the-best-layout-for-developers",
      status: 301
    },
    "/quit-spotlight-and-alfred-10-best-raycast-extensions-for-web-developers/": {
      destination: "/articles/quit-spotlight-and-alfred-10-best-raycast-extensions-for-web-developers",
      status: 301
    },
    "/how-tana-made-me-choose-obsidian-as-my-note-taking-app-and-its-amazing/": {
      destination: "/articles/how-tana-made-me-choose-obsidian-as-my-note-taking-app-and-its-amazing",
      status: 301
    },
    "/slow-software-a-sign-of-appreciation-for-developers/": {
      destination: "articles/slow-software-appreciation-for-developers",
      status: 301
    },
    "/some-great-slow-software-companies/": {
      destination: "articles/slow-software-great-slow-software-companies",
      status: 301
    }
  }
});