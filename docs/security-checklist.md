# Website and application security checklist
**Last updated:** 18 October 2026

Security is not a single Cloudflare toggle. It comes from safe code, correct access controls, careful secret handling and testing.

## Public static websites

- [ ] Keep dependencies and third-party scripts to a minimum.
- [ ] Use HTTPS and avoid mixed-content resources.
- [ ] Avoid collecting information you do not need.
- [ ] Do not publish private files, credentials, database exports or internal notes.
- [ ] Validate forms and provide useful error messages.
- [ ] Add accessible labels and avoid unsafe HTML injection.
- [ ] Keep redirects and headers consistent with the site's needs.
- [ ] Check third-party analytics and embedded widgets for privacy implications.

## Apps with APIs or accounts

- [ ] Keep all private API keys and privileged database credentials server-side.
- [ ] Authenticate users and authorize every protected operation; authentication alone is not authorization.
- [ ] Validate and constrain all user input on the server.
- [ ] Use parameterized database queries or safe ORM APIs.
- [ ] Apply rate limiting and abuse controls appropriate to the endpoint.
- [ ] Verify payment/webhook signatures and handle retries safely.
- [ ] Avoid exposing stack traces, secret values or raw internal errors.
- [ ] Restrict CORS to trusted origins when cross-origin access is needed; CORS is not authentication.
- [ ] Use secure session/cookie settings when applicable.
- [ ] Keep dependencies updated and remove unused permissions.
- [ ] Review database row-level security and service-role usage where relevant.

## Secrets and Git

Never commit secrets to a repository—even a private repository. If a credential has been pushed:
1. Revoke or rotate it immediately.
2. Check logs and access history if the service provides them.
3. Remove it from the current source and any deployment configuration where it was copied.
4. Consider whether Git history also needs cleanup, but do not mistake history rewriting for revocation.
5. Replace it with a properly stored secret and review how it is used.

A frontend environment variable is not automatically secret. If a framework embeds a variable in the browser bundle, anyone can read it.

## Cloudflare configuration

- [ ] Grant team members only the permissions they need.
- [ ] Use separate development/preview and production configuration where appropriate.
- [ ] Keep production secrets separate from public build-time values.
- [ ] Understand which requests are served as static assets and which execute Worker code.
- [ ] Monitor logs and error rates without recording sensitive request bodies.
- [ ] Check service-specific quotas and billing before enabling paid features.
- [ ] Test recovery and rollback procedures.

## Before collecting payments or personal data

Do not rely on a visual checkout page alone. Use a reputable payment provider, validate callbacks server-side, verify transaction status with the provider, protect customer data, and never store card security codes. Follow applicable laws and the payment provider's requirements.

This guide is educational and does not replace a security review for a high-risk production system.

## Official references

- [Cloudflare security docs](https://developers.cloudflare.com/security/)
- [Workers secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)
