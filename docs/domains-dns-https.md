# Domains, DNS and HTTPS
**Last updated:** 18 October 2026

Cloudflare provides a generated address for testing your deployed project. You can add a custom domain when you own it and are ready to make the site easier to remember.

## Before you start

- You must control the domain or have permission from its owner.
- Know whether you are connecting an apex domain (for example, `example.com`) or a subdomain (for example, `www.example.com`).
- Check existing DNS records before changing anything. MX and related records may keep business email working.
- If this is a company domain, coordinate with whoever manages its email, verification and other services.

## Connect the domain

1. Open the relevant Pages project or Worker in Cloudflare.
2. Open its custom domain or domain configuration section.
3. Add the exact hostname you want to use.
4. Follow the dashboard's instructions for DNS and domain activation.
5. Wait for verification and certificate provisioning.
6. Test the domain with and without `www` if you intend to support both, and decide which hostname should be canonical.
7. Confirm HTTPS loads without a browser certificate warning.

The exact steps differ depending on whether the domain's DNS zone is already managed by Cloudflare and which deployment product you use. Follow the product-specific dashboard instructions rather than copying DNS records from another project.

## DNS basics

- **A / AAAA:** maps a hostname to an IP address.
- **CNAME:** points one hostname to another hostname.
- **MX:** routes email.
- **TXT:** commonly used for verification, email authentication and other domain policies.
- **Nameservers:** indicate which DNS provider is authoritative for a domain.

Do not delete unknown records without understanding their purpose. Changing nameservers can affect all DNS records for a domain if the records are not recreated at the new provider.

## HTTPS and redirects

Cloudflare can provision HTTPS for supported custom-domain setups. After it is active:
- Test the exact production hostname.
- Redirect HTTP to HTTPS where the product/setup supports it.
- Choose a canonical host (apex or www) and redirect the alternative consistently.
- Update hard-coded links and callback URLs in third-party services.
- Check redirects for loops.

## Common domain problems

- **Pending validation:** check whether the required DNS record exists and whether it has propagated.
- **Domain active but wrong site:** verify the hostname is attached to the intended project and DNS points to the correct target.
- **Certificate pending:** follow Cloudflare's displayed validation requirements; avoid repeatedly changing records without evidence.
- **Email stopped working:** review MX, SPF, DKIM and DMARC records and restore required values from your email provider.
- **Redirect loop:** check application redirects and Cloudflare settings together.

## Official references

- [Custom domains on Pages](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare DNS documentation](https://developers.cloudflare.com/dns/)
- [Workers custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
