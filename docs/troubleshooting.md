# Cloudflare deployment troubleshooting
**Last updated:** 18 October 2026

When a deployment fails, read the first meaningful error in the log. The last line may only describe the failure after the original problem.

## Build or deployment failed

1. Open the latest deployment and inspect its build log.
2. Find the first error, not just the final summary.
3. Check the selected branch and root directory.
4. Confirm the build command matches the framework.
5. Confirm dependencies and lockfile are committed.
6. Run the same build locally if possible.
7. Verify the output directory exists and contains the expected files.
8. Check whether a required environment variable is missing.

## 404 on the home page

For a static site, make sure a top-level `index.html` exists in the deployed output directory. For framework apps, confirm that the configured output directory matches the generated files and that routing behavior is appropriate for the framework.

## CSS, JavaScript or images are missing

- Check file names and capitalization.
- Inspect browser developer tools → Network for 404s.
- Verify asset paths. A path starting with `/` points to the domain root, which can be wrong if an app is hosted under a subpath.
- Check whether your build tool rewrites assets into a generated directory.
- Confirm the files were committed and included in the deployed output.

## Works locally but not in production

- Do not hard-code `localhost` as the API hostname.
- Check production environment variables and bindings.
- Confirm CORS and authentication configuration.
- Check browser console/network errors.
- Verify the runtime supports the APIs your code uses.
- Reproduce with a preview deployment before changing production.

## API returns 500

- Check Worker/Function logs.
- Inspect secret names and bindings without printing secret values.
- Verify database connectivity and permissions.
- Add safe error handling and a request/correlation ID.
- Avoid returning raw stack traces to visitors.

## Domain or HTTPS problem

Check the custom-domain status, DNS records and certificate status in Cloudflare. Avoid changing nameservers or deleting email records as a first troubleshooting step. See [Domains, DNS and HTTPS](domains-dns-https.md).

## Pages Functions not running

The `functions/` directory must be at the root of the Pages project source, not inside the static output directory. Check the current Pages Functions docs for routing and deployment requirements. Direct Upload from the dashboard does not support Pages Functions in the same way as Git integration or Wrangler deployment.

## Good bug report checklist

When asking for help, include:
- Pages or Workers?
- Framework and version, if any.
- Build command and output directory.
- The first useful error from the deployment log.
- What you expected and what actually happened.
- Whether it works locally and whether a preview URL reproduces it.

Remove API keys, passwords, authorization headers, private customer data and other secrets from logs before sharing them.

## Official references

- [Static HTML deployment](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Pages Functions](https://developers.cloudflare.com/pages/functions/get-started/)
- [Workers documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare status](https://www.cloudflarestatus.com/)
