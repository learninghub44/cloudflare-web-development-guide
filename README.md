# CodeFamily Cloudflare Web Development Guide

**Created by:** Chris Odhiambo  
**Project:** CodeFamily  
**Last reviewed:** 18 October 2026

A practical, beginner-friendly handbook for building, deploying, and maintaining websites and applications with Cloudflare. It is designed for learners, independent developers, and small teams who want clear explanations and reliable deployment steps.

**Live guide:** https://cloudflare-web-development-guide.pages.dev/  
**Source code:** https://github.com/learninghub44/cloudflare-web-development-guide

> The goal is to explain not only which buttons to click, but why each setting matters and how to choose an appropriate deployment approach.

## Start here

- [Open the live guide](https://cloudflare-web-development-guide.pages.dev/)
- [Choose Pages or Workers](docs/pages-vs-workers.md)
- [Deploy plain HTML, CSS, and JavaScript](docs/static-html-deployment.md)
- [Frameworks and build settings](docs/frameworks-and-build-settings.md)
- [Workers, APIs, and server-side code](docs/workers-and-apis.md)
- [Domains, DNS, and HTTPS](docs/domains-dns-https.md)
- [Security checklist](docs/security-checklist.md)
- [Troubleshooting](docs/troubleshooting.md)

## What can you deploy?

| Project | Possible approach | Notes |
| --- | --- | --- |
| Plain HTML, CSS, and JavaScript site | Pages or Workers Static Assets | No application server required |
| Portfolio, company site, or documentation | Pages or Workers Static Assets | Suitable for static content |
| Vite application | Pages or Workers | Check build output and backend requirements |
| Astro, Hugo, Eleventy, or another static generator | Pages or Workers Static Assets | Depends on the generated output |
| Application with API routes | Workers, or Pages Functions for an existing project | Check runtime compatibility |
| Next.js application requiring server rendering | Workers with the supported adapter | Follow the current Next.js deployment guide |
| API, webhook, or scheduled task | Workers | Configure secrets and bindings appropriately |
| Application requiring database or file storage | Workers with D1, KV, R2, or an external database | Select storage based on data and access needs |

Cloudflare's platform and product recommendations evolve. Confirm current product documentation before making production architecture decisions. Pages can remain suitable for existing sites and static deployments; Workers supports a broad range of application use cases.

## What you need

1. A Cloudflare account.
2. Website files or a Git repository hosted on a supported Git provider.
3. Git and the relevant runtime or build tools for your chosen framework.
4. A custom domain only if you want your own domain; use the provided project URL for initial testing.
5. For backend services, the required database, bindings, and API credentials.

A static website does not require you to rent a traditional server. Never commit API keys, access tokens, passwords, private keys, or production secrets to a repository.

## Quick route: deploy a static website

1. Ensure the project has an `index.html` entry point.
2. Put CSS, JavaScript, images, and other assets in the project and check their relative paths.
3. Push the project to your Git repository.
4. In Cloudflare, open **Workers & Pages** and create a project using the deployment method appropriate for your site.
5. Set the correct root and output directory. For a plain static site, do not run a framework build unless the project actually needs one.
6. Deploy and test the live site on mobile and desktop. Check navigation, images, forms, accessibility, and browser-console errors.

Follow the [full static deployment walkthrough](docs/static-html-deployment.md) for detailed steps.

## Official Cloudflare references

- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Deploy a static HTML site](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Pages framework guides](https://developers.cloudflare.com/pages/framework-guides/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Create a project with C3](https://developers.cloudflare.com/pages/get-started/c3/)
- [Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Custom domains on Pages](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare documentation contribution guide](https://developers.cloudflare.com/style-guide/contributions/)

## Contributing

Corrections, suggestions, and tested improvements are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request. Product instructions can change, so include enough context for another person to reproduce a problem.

## Project status and affiliation

This is an independent community learning resource created by **Chris Odhiambo for CodeFamily**. It is not an official Cloudflare publication and does not imply Cloudflare endorsement or authorization. Cloudflare product names and marks belong to their respective owners.

## Licence

No licence has been declared for this repository yet. Until a licence is added, do not assume you have permission to copy, redistribute, or create derivative versions of the guide. The repository owner should choose and add a licence that matches the intended reuse terms.

---

**CodeFamily** — practical guides for learners and builders.  
Last reviewed: 18 October 2026.
