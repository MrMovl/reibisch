# reibisch

Personal business homepage. A single-page Phoenix app with no database or CMS — content lives in source code and is maintained via Claude.

## Stack

- [Elixir](https://elixir-lang.org/) / [Phoenix](https://www.phoenixframework.org/) 1.7
- HEEx templates, Tailwind CSS (CDN for now)
- Docker + docker-compose for deployment

## Local development

**Prerequisites:** Elixir 1.14+, Erlang/OTP 24+

```bash
mix deps.get
mix phx.server
```

Visit [localhost:4000](http://localhost:4000).

## Tests

```bash
mix test
```

## Deployment

The app ships as an OTP release inside a Docker container.

**Build and run:**

```bash
docker build -t reibisch .
docker run -p 4000:4000 \
  -e SECRET_KEY_BASE=$(mix phx.gen.secret) \
  -e PHX_HOST=yourdomain.com \
  reibisch
```

**With docker-compose** (expects a `.env` file or environment variables):

```bash
SECRET_KEY_BASE=... PHX_HOST=yourdomain.com docker-compose up
```

Generate a secret key with: `mix phx.gen.secret`

## Content

All page content is in `lib/reibisch_web/controllers/page_html/home.html.heex`. Edit that file to update the page. No rebuild needed in dev — Phoenix reloads automatically.
