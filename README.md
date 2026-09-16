# reibisch

Personal business homepage ([reibisch.de](https://reibisch.de)). Phoenix is used at build time only: all pages are rendered to static HTML and served by nginx. No database or CMS — content lives in source code and is maintained via Claude.

## Stack

- [Elixir](https://elixir-lang.org/) / [Phoenix](https://www.phoenixframework.org/) 1.7
- HEEx templates with inline CSS
- Static output served by nginx in Docker (Raspberry Pi, armv7)

## Local development

**Prerequisites:** Elixir 1.14+, Erlang/OTP 24+

```bash
mix deps.get
mix phx.server
```

Visit [localhost:4000](http://localhost:4000).

Or with Docker: `docker compose up`.

## Tests

```bash
mix test
```

## Static build

```bash
mix build.static
```

Renders every page listed in `@pages` in `lib/mix/tasks/build_static.ex` to `_site/`. New pages need an entry there plus a matching route and controller action (used by the dev server).

## Deployment

```bash
./deploy.sh
```

Cross-builds a `linux/arm/v7` image locally (the Pi runs out of memory building the site), ships it over SSH with `docker save | ssh pi 'docker load'`, and restarts `docker-compose.prod.yml` on the Pi. It builds from the **local working tree**, so pull `main` first. See the header of `deploy.sh` for env var overrides.

## CI / Automated deployment

CI (tests only) runs **manually** (`workflow_dispatch`). Deployment is done from a dev machine with `./deploy.sh`, not from GitHub Actions.

Do not register a self-hosted GitHub Actions runner for this repo: in a public repository, pull requests from forks could run arbitrary code on it.

## Content

Page content lives in `lib/reibisch_web/controllers/page_html/*.html.heex` (home, imprint, privacy, projects, card). Edit those files to update the pages. No rebuild needed in dev — Phoenix reloads automatically.
