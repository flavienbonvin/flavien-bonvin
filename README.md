<p align="center">
  <img alt="flavienbonvin.com" src="public/favicon.svg" width="100" />
</p>
<h1 align="center">
  flavienbonvin.com
</h1>

<p align="center">My personal blog</p>

## About the author

Hello 🦆 I'm Flavien Bonvin and I'm a frontend engineer. I've been blogging on and of for sometime now. You're on the repo that runs my blog which can be accessed here [flavienbonvin.com](flavienbonvin.com).

You can find me in the following social networks:

- [X (Twitter) (@flavienbonv)](https://twitter.com/flavienbonvin)
- [GitHub (flavienbonvin)](https://github.com/flavienbonvin)

## Tech stack

- [Astro](https://astro.build/) to build the blog.
- [Tailwind](https://tailwindcss.com/) for styling.
- [Resend](https://resend.com/) for newsletter.
- [Netlify](https://netlify.com/) for deployment and hosting.

## Deployment

This blog is deployed on Netlify. The configuration is handled by:

- `netlify.toml` - Contains build settings, redirects, and security headers
- `@astrojs/netlify` adapter - Enables server-side features and optimizations

### Local Development

```bash
bun install
bun run dev
```

### Building

```bash
bun run build
```

### Environment Variables

You'll need to configure the following environment variables in your Netlify site settings:

- `BLOG_AUDIENCE_ID` - Your Resend audience ID for newsletter subscriptions
- `RESEND_API_KEY` - Your Resend API key for sending emails

### Deploying

The site automatically deploys when changes are pushed to the main branch. For manual deployment:

```bash
netlify deploy --prod
```
