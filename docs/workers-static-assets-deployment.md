# Deploy with Cloudflare Workers Static Assets
**Last updated:** 18 October 2026

Cloudflare Workers can serve your HTML, CSS, JavaScript, images and other static files. You can start with a plain static site and later add a Worker handler for API routes without moving to a traditional server.

Cloudflare's current Workers guidance recommends Workers Static Assets for new static sites, single-page applications and full-stack apps. Pages remains available and is still a valid option for many projects.

## Requirements

- A Cloudflare account.
- Node.js and npm for the common CLI workflow.
- A terminal (PowerShell, Windows Terminal, macOS Terminal or Linux shell).
- A folder containing your website files.
- A browser to test the deployed URL.
- GitHub is optional for a direct CLI deploy, but recommended for source control and collaboration.

## Option A: create a starter project

Run this in a terminal:

```bash
npm create cloudflare@latest -- my-static-site
cd my-static-site
```

Follow the interactive prompts and select a static-site starter for a static website. Cloudflare's starter questions may change, so read each prompt instead of blindly accepting defaults.

## Option B: use an existing static website

You can configure an existing project with Wrangler. A simple static-only project can use a configuration such as:

```json
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-static-site",
  "compatibility_date": "2026-10-18",
  "assets": {
    "directory": "./public"
  }
}
```

Place your `index.html`, CSS, JavaScript and images inside `public/` in this example. The `directory` value must match the real folder containing your deployable files. If your files are in the project root or another output folder, change the path accordingly. Use the compatibility date appropriate to the project when you create or update the configuration.

This is a configuration example, not a complete generated project: use a current Wrangler version and install/configure the project dependencies as required by the official starter.

## Test and deploy

From the project directory:

```bash
npx wrangler dev
```

Open the local URL printed in the terminal and test it. When you are ready:

```bash
npx wrangler deploy
```

Follow the CLI prompts to sign in and confirm the target account. After a successful deployment, Wrangler reports the deployed URL, commonly under `workers.dev` unless you configure a custom domain.

## Add API routes later

A full-stack Worker can serve assets and handle selected requests. When the Worker script has an asset binding, a handler can return API responses for a path and pass other requests to the assets service:

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({ status: "ok" });
    }

    return env.ASSETS.fetch(request);
  }
};
```

This pattern assumes your Wrangler configuration defines an `ASSETS` binding and a Worker entry point. If you have a static-only project with no Worker script, you do not need that binding or the example handler.

## Framework builds

For a Vite or other framework project, the static assets directory is often the generated build output, such as `dist`. Do not assume it is always `public`: `public` commonly contains source assets copied into the final build, while `dist` contains the complete deployable result.

When using a Cloudflare framework plugin, follow that plugin's configuration; it may manage assets for you. Server-side rendering requires the appropriate framework adapter and Worker runtime configuration.

## Common mistakes

- **Wrong folder:** set `assets.directory` to the actual output directory.
- **Missing homepage:** make sure `index.html` exists in the deployed directory.
- **Local command works, deploy fails:** read the Wrangler error and confirm the project is configured for the intended account and environment.
- **API route returns a static 404:** verify the Worker entry point and asset binding are configured and the route logic is deployed.
- **SPA route refresh returns 404:** configure the appropriate SPA fallback behavior; do not enable SPA fallback for every type of multi-page website without checking its routing.
- **Private token in code:** store secrets using Cloudflare's supported secret configuration; do not place them in browser JavaScript or source control.

## Official references

- [Workers Static Assets: get started](https://developers.cloudflare.com/workers/static-assets/get-started/)
- [Workers Static Assets configuration](https://developers.cloudflare.com/workers/static-assets/)
- [Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)
- [Pages vs Workers framework guidance](https://developers.cloudflare.com/pages/framework-guides/)
