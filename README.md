## Looking to make an interactive, serverless, blog site with Remix, free tier serverless hosting, relational Prisma DB connect!

## Based on these great projects / approaches!

https://github.com/remix-run/remix/tree/main/templates/cloudflare-pages
https://developers.cloudflare.com/pages/platform/functions/plugins/
https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers

https://github.com/timlrx/tailwind-nextjs-starter-blog
https://docs.pmnd.rs/react-three-fiber/getting-started/examples

## Development

You will be utilizing Wrangler for local development to emulate the Cloudflare runtime. This is already wired up in your package.json as the `dev` script:

```sh
npm run build
npm run dev
```

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be ready to go!

## Deployment

Cloudflare Pages are currently only deployable through their Git provider integrations.

If you don't already have an account, then [create a Cloudflare account here](https://dash.cloudflare.com/sign-up/pages) and after verifying your email address with Cloudflare, go to your dashboard and follow the [Cloudflare Pages deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything).

Configure the "Build command" should be set to `npm run build`, and the "Build output directory" should be set to `public`.
