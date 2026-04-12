# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for "Valmennuskeskus Neppari", a neuropsychiatric coaching and training service in Tampere, Finland. Built with Jekyll 4.2.1. Deployed on Netlify.

## Development Commands

**Run locally with Docker (recommended):**
```bash
docker build -t neppari . && docker run -it --rm --volume="$PWD":/usr/src/app -p 4000:4000 -p 35729:35729 --name neppari-run neppari
```

**Run locally without Docker:**
```bash
./start.sh
# or manually:
bundle exec jekyll serve --config _config.yml,_config_local.yml
```

Site is available at http://localhost:4000.

**Regenerate Gemfile.lock after dependency changes:**
```bash
docker run --rm -v "$PWD":/usr/src/app -w /usr/src/app ruby:2.7 bundle install
```

There is no test or lint setup.

## Architecture

Jekyll static site with a custom theme based on Hyde. Content is in Finnish.

- `_layouts/` — Four page templates: `default`, `page`, `post`, `blog-frontpage`
- `_includes/` — Reusable partials (head, navigation, sidebar, Open Graph meta, Google Analytics, social sharing)
- `_posts/` — Blog posts in Markdown
- `css/` — SCSS source files; `styles.scss` is the entry point. Theme partials are prefixed with `_`
- `public/` — Static assets (images, compiled CSS, favicons, OG images)
- `_config.yml` — Main config: site metadata, author info, contact details, Prose.io CMS settings
- `_config_local.yml` — Overrides `url` to `http://localhost:4000` for local dev
- `netlify.toml` — Netlify deploy config and 301 redirects for old service page URLs

Service/content pages live as `.md` files in the root (e.g., `nepsy-valmennus.md`, `niina.md`, `koulutukset.md`).
