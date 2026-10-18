# Ronnie Zhao · Portfolio

Personal portfolio built with React, TypeScript, and Vite.

## Local development

```sh
pnpm install
pnpm dev
```

## Publish with GitHub Pages

Push the `main` branch to GitHub. The workflow in `.github/workflows/deploy.yml` builds the site and publishes the `dist` directory. The Vite base path is derived from the GitHub repository name, so project pages load their images and videos from the correct subpath.
