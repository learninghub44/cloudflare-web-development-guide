# Cloudflare Web Development Guide
**Author:** Chris Odhiambo — Chris Tech  
**Last updated:** 18 October 2026

A practical, beginner-friendly handbook for publishing websites and applications with Cloudflare. It covers plain HTML/CSS/JavaScript, static-site generators, modern frameworks, Cloudflare Pages, Workers, APIs, custom domains, security, and troubleshooting.

> The goal is to explain not only which buttons to click, but why each setting matters and how to choose the right deployment method.

## Start here

- [Open the guide website](index.html)
- [Choose Pages or Workers](docs/pages-vs-workers.md)
- [Deploy plain HTML/CSS/JS](docs/static-html-deployment.md)
- [Frameworks and build settings](docs/frameworks-and-build-settings.md)
- [Workers, APIs and server-side code](docs/workers-and-apis.md)
- [Domains, DNS and HTTPS](docs/domains-dns-https.md)
- [Security checklist](docs/security-checklist.md)
- [Troubleshooting](docs/troubleshooting.md)

## What can you deploy?

| Project | Typical choice | Why |
|---|---|---|
| A simple HTML/CSS/JS website | Pages or Workers Static Assets | No server to manage |
| A portfolio, company website or documentation site | Pages or Workers Static Assets | Fast static delivery |
| Vite app (React, Vue, Svelte, etc.) | Pages or Workers | Build assets first; choose based on backend needs |
| Astro, Hugo, Eleventy or another static generator | Pages or Workers Static Assets | Output is static files |
| Full-stack app with API routes | Workers, or Pages with Functions for an existing project | Server-side JavaScript runs at the edge |
| Next.js app needing server rendering | Cloudflare Workers with the supported adapter | SSR needs a compatible runtime |
| API, webhook or scheduled task | Workers | Request handling, secrets and bindings |
| App needing database or file storage | Workers + D1/KV/R2 or an external database | Backend code connects securely to storage |

Cloudflare's product guidance changes over time. Its current Pages documentation says Workers supports most Pages use cases and recommends Workers for new projects. Pages remains useful for existing Pages sites and straightforward static deployments. Always check the official framework-specific guide before selecting a production architecture.

## Basic requirements

1. A Cloudflare account.
2. Website files in a folder, or a Git repository on GitHub/GitLab.
3. For Git deployment, a Git account and permission to connect the repository to Cloudflare.
4. For framework projects, the runtime/tooling required by that framework (commonly Node.js and npm).
5. A domain only if you want a custom address; the default Cloudflare-provided URL is enough to test.
6. For backend services, any required database, API credentials and bindings. Never commit secrets into a public repository.

You do **not** need to buy a server for a static site. You do not need Node.js to edit or serve a plain HTML page locally, although Git and a terminal are useful for deployment workflows.

## Quick route: plain static website

1. Make sure the project has a top-level `index.html`.
2. Put CSS, JavaScript and images in the project and reference them with correct relative paths.
3. Push the files to GitHub.
4. In Cloudflare, open **Workers & Pages** and create a Pages project connected to the repository, or use Workers Static Assets if you are choosing the newer Workers approach.
5. For Pages, use the correct output directory. If files are at the repository root, use `/` or the dashboard's equivalent root-directory setting. Use `exit 0` as a no-build command where appropriate; do not run a framework build command for plain static files.
6. Deploy, open the generated URL and test every page, image, link and form.

See [the full static deployment walkthrough](docs/static-html-deployment.md).

## Official documentation

- [Cloudflare Pages overview](https://developers.cloudflare.com/pages/)
- [Static HTML on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Pages framework guides](https://developers.cloudflare.com/pages/framework-guides/)
- [Workers overview](https://developers.cloudflare.com/workers/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Create a Cloudflare project (C3)](https://developers.cloudflare.com/pages/get-started/c3/)
- [Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Custom domains on Pages](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Workers documentation](https://developers.cloudflare.com/workers/)

## Contributing

Open an issue or pull request if a step is unclear or Cloudflare changes a dashboard label. Include the product (Pages or Workers), framework, build command, output directory, and the relevant error message. Remove tokens, passwords, private keys and personal data before sharing logs.

---

Created for learners and builders by **Chris Odhiambo — Chris Tech**.  
Last updated: **18 October 2026**.
