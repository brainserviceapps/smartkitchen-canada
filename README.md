# TM7 Canada Site

Built with [Eleventy (11ty)](https://www.11ty.dev/).

## Local development

```
npm install
npm start
```

Then open the local URL it prints (usually http://localhost:8080).
Changes to files in `src/` auto-reload.

## Build for production

```
npm run build
```

Outputs static files to `_site/` — this is what actually gets hosted.

## Editing content

- `src/_data/site.json` — your name, consultant link, tagline, Kit form URL. Edit this first.
- `src/index.njk` — home page
- `src/faq.njk` — FAQ page
- `src/about.njk`, `src/contact.njk`, `src/privacy-policy.njk` — other pages
- `src/_includes/base.njk` — shared header/footer/nav (edit once, applies everywhere)
- `src/css/style.css` — styling

## Deploying

Push to the `main` branch on GitHub. The workflow in
`.github/workflows/deploy.yml` builds and publishes automatically to
GitHub Pages — no local build step required once this is set up.
