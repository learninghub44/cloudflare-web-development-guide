# Workers, APIs and backend services
**Last updated:** 18 October 2026

A frontend runs in the visitor's browser. A backend runs in a trusted environment and can validate requests, access private credentials and communicate with databases or other services. Cloudflare Workers lets you write server-side JavaScript/TypeScript without managing a traditional server.

## When you need a Worker

Examples include:
- An API endpoint called by your website.
- A webhook receiver for a payment provider.
- A trusted integration with a third-party API that uses a secret key.
- Server-side validation, access checks or rate limiting.
- Scheduled tasks and background processing, using the appropriate Cloudflare products.
- Serving static assets alongside dynamic routes.

You do not need a Worker for a page that only displays content and runs simple browser-side interactions.

## Requirements

- A Cloudflare account.
- A JavaScript/TypeScript project or a supported framework.
- Node.js/npm and Git for the common local development workflow.
- Wrangler CLI for many local development and deployment tasks.
- Bindings/secrets configured in the project when connecting databases, object storage or external APIs.
- An understanding of HTTP methods, status codes, JSON, validation and error handling.

## Basic Worker example

This minimal Worker responds to a request. It demonstrates the shape of a Worker, not a complete production API:

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({ status: "ok" });
    }

    return new Response("Not found", { status: 404 });
  }
};
```

The `env` parameter is where configured bindings and secrets are made available. This example does not need to use it yet. A production API must also consider allowed methods, input validation, authentication/authorization, error handling, logging and abuse controls.

## Keep secrets on the server

Never put a private API token, payment secret, database service-role key or signing key in browser JavaScript, HTML, a public repository, or a variable intentionally exposed to the frontend. Users can inspect browser bundles and network requests.

Store credentials using Cloudflare's supported secret/configuration facilities. Use the least privilege possible, rotate a secret if it leaks, and do not log sensitive values.

## Connect a database or storage

Choose based on the data and workload:
- **D1:** managed SQL database from Cloudflare.
- **KV:** key-value storage suited to appropriate lookup/configuration patterns.
- **R2:** object storage for files and other objects.
- **Queues:** asynchronous message processing.
- **Durable Objects:** stateful coordination and specific real-time/stateful use cases.
- **External database:** can be appropriate when the provider and connectivity model fit your application.

A database is not automatically provisioned when you deploy a Worker. Create the resource, configure the binding/connection securely, and design authorization and data access intentionally.

## Pages Functions or Workers?

Pages Functions add server-side behavior to an existing Pages project. Files under a root-level `functions/` directory map to routes according to the Pages routing conventions. Workers offers a more direct model for new APIs and broader platform features. Read current docs before deciding.

## Local development and deployment

Cloudflare's CLI, Wrangler, supports local development and deployment. Exact commands depend on how the project was created; use the official guide for the selected template and keep its Wrangler configuration in source control without committing secrets.

## Production checklist

- Validate the request body and reject unexpected input.
- Authenticate the caller when the endpoint is not public.
- Check authorization for each protected action and each resource.
- Apply sensible rate limits and abuse controls.
- Use HTTPS and verify third-party webhook signatures.
- Keep credentials out of logs and client code.
- Return clear HTTP status codes without exposing stack traces or private database errors.
- Test failure cases, timeouts and duplicate webhook deliveries.
- Review Cloudflare usage limits and the pricing for any services you enable.

## Official references

- [Workers documentation](https://developers.cloudflare.com/workers/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Pages Functions: get started](https://developers.cloudflare.com/pages/functions/get-started/)
- [Workers secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
