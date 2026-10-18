# Cloudflare Pages vs Workers
**Last updated:** 18 October 2026

Cloudflare has two closely related ways to publish web projects. The names can be confusing, so start with what your application needs to do.

## The short answer

- Choose **Pages** when you have a static website or an existing Pages project and want Git-based builds, previews and simple publishing.
- Choose **Workers** for a new project that needs APIs, request handling, server-side logic, scheduled jobs, or the broader Workers platform.
- Both can serve static assets. A static site does not require a server just because it has JavaScript in the browser.

Cloudflare's current Pages documentation says Workers supports most Pages use cases and offers a broader feature set, and recommends Workers for new projects. Features differ, so verify your specific requirement before migrating.

## What does “static” mean?

A static site is made of files such as HTML, CSS, JavaScript, images and fonts. Cloudflare returns those files to the browser. JavaScript in the browser can create interactive menus, filters or calculators, but it cannot safely hold private API keys or independently perform trusted server-side work.

A site becomes dynamic when requests need server-side processing—for example, checking a session, validating a payment callback, accessing a database using privileged credentials, or generating a response per request.

## Compare the options

| Need | Pages | Workers |
|---|---|---|
| Plain HTML/CSS/JS | Yes | Yes, using Static Assets |
| Git-connected deployment | Yes | Supported workflows vary by setup |
| Preview deployments | Yes | Yes |
| Server-side endpoints | Pages Functions | Worker handlers/routes |
| File-based Pages Functions routing | Yes | Not the same model; framework routing or explicit routing is used |
| Custom domains | Yes | Yes |
| Scheduled jobs / broader Worker platform | Check current feature support | Strong fit |
| Existing Pages site | Natural fit | Consider migration only when needed |

## Simple decision guide

1. **Only files?** Publish them as static assets. Pages is an easy starting point; Workers Static Assets is also an option.
2. **Vite/React/Vue app that builds into HTML/CSS/JS?** Publish the build output. Choose Pages or Workers based on your routing and backend requirements.
3. **Need an API?** Use Workers, or add Pages Functions if you are already using Pages.
4. **Need server-rendered framework routes?** Follow the current Cloudflare guide for that framework. Do not assume a static export and server-rendered deployment use the same build settings.
5. **Need database, private credentials, queues, scheduled work or object storage?** Check Workers bindings and Cloudflare services such as D1, KV, R2 and Queues; an external database can also be used where supported.

## Important difference: deploy method

A Git-connected Pages project can automatically build and deploy when changes reach the configured branch. Workers deployments can use the supported dashboard, Git integration where available, or Wrangler CLI workflows. Follow the current instructions for the project type you choose.

## Official references

- [Pages overview](https://developers.cloudflare.com/pages/)
- [Workers overview](https://developers.cloudflare.com/workers/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Workers and Pages framework guides](https://developers.cloudflare.com/pages/framework-guides/)
