# Deploy a plain HTML, CSS and JavaScript website
**Last updated:** 18 October 2026

This walkthrough assumes your website does not need a framework or build tool. It can be a business site, portfolio, landing page, documentation page or browser-only utility.

## Requirements

- A Cloudflare account.
- A folder containing your website.
- A GitHub account and repository if you want automatic deployments from Git.
- A browser to test the result.
- A custom domain is optional. Cloudflare provides a project URL for testing.

## 1. Organize your files

For a small website, a simple structure is enough:

```text
my-website/
├── index.html
├── about.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── images/
    └── logo.png
```

Use paths that match the actual folders. For example, `<link rel="stylesheet" href="/css/styles.css">` is rooted at the site domain, while `css/styles.css` is relative to the current URL. For a site hosted under a project subpath, relative paths may be more portable.

Make sure `index.html` is at the root of the deployed output directory. If it is missing or nested one folder too deep, the home page may return a 404.

## 2. Test before deployment

Open `index.html` in your browser for a quick check. A local development server is better when you use JavaScript modules or fetch requests. Confirm that:
- CSS loads and the layout works on a phone.
- Images use the right paths.
- Navigation links go to real pages.
- Browser console has no unexpected errors.
- Forms show a useful success/error state and are connected to a real service.

A visual form is not automatically functional. A static page needs a backend, a form service, or a carefully selected external service to actually submit data.

## 3. Push your project to GitHub

Create an empty repository on GitHub, then open a terminal inside your project folder:

```bash
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Replace the sample username and repository name with your own. If Git says your identity is not configured, set your Git author name and email locally. Never put access tokens into the repository or paste them into screenshots.

If the folder is already a Git repository, do not run `git init` again; inspect `git status` and the existing remote first.

## 4. Deploy with Cloudflare Pages

Dashboard labels can change, but the general flow is:

1. Sign in to Cloudflare.
2. Open **Workers & Pages**.
3. Choose to create an application and select **Pages**.
4. Connect to Git and authorize access to the correct GitHub repository.
5. Select the repository and production branch, usually `main`.
6. Configure build settings. For plain files, no framework build is required.
7. Set the output directory to the folder containing `index.html`. If `index.html` is in the repository root, use the root directory setting offered by the dashboard.
8. Start deployment and wait for the build/deploy result.
9. Open the generated `*.pages.dev` URL and test the site.

Cloudflare's static HTML guide shows `exit 0` as an optional no-build command for projects without a build step. The output directory must still point to the correct files. Do not copy a framework's build command into a plain static project.

## 5. Automatic updates

After Git integration is configured, changes pushed to the configured production branch trigger a new deployment. Pull requests can receive preview deployments, depending on project settings. A practical workflow is:
1. Make a small change locally.
2. Test it.
3. Commit and push to a feature branch.
4. Preview and review it.
5. Merge to the production branch.
6. Check the live URL after deployment.

## 6. Use a custom domain (optional)

Open the project’s custom-domain settings, enter the domain or subdomain you own, and follow Cloudflare's DNS instructions. Do not randomly delete existing DNS records—email and other services may depend on them. See [Domains, DNS and HTTPS](domains-dns-https.md).

## Common mistakes

- **404 at the home page:** check for `index.html` at the top level of the output folder.
- **CSS or images missing:** fix path capitalization and relative paths; deployed Linux environments are case-sensitive.
- **Build fails:** remove framework commands if no build is required, and check the log for the first real error.
- **Website works locally but not online:** inspect console/network errors and check whether your code expects a local file path or localhost API.
- **Form never sends:** connect a real endpoint or form service; static hosting alone does not process submissions.
- **Secret exposed:** remove it from the frontend, rotate/revoke it, and move trusted operations to a server-side endpoint.

## Official reference

[Cloudflare: Static HTML on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
