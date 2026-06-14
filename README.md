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

## CI / Automated deployment

CI runs are currently set to **manual only** (`workflow_dispatch`) because the deploy target is a home server (Raspberry Pi) behind a local-network firewall — GitHub-hosted runners can't reach it via SSH.

The deploy job is written for a **self-hosted GitHub Actions runner** running directly on the Pi. Once the runner is registered, automated test + deploy on every push to `main` is one config change away.

### Setting up the self-hosted runner on the Pi

1. Go to **GitHub → Repo → Settings → Actions → Runners → New self-hosted runner**
2. Follow the download and configure steps GitHub shows (takes ~5 minutes)
3. Install and start it as a systemd service:

```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

4. In `.github/workflows/ci.yml`, replace the `workflow_dispatch` trigger with the push/pull_request block that is commented out at the top of the file

After that, every push to `main` will run tests on GitHub-hosted infrastructure and deploy to the Pi via the self-hosted runner — no SSH keys, no secrets, no firewall changes needed.

## Content

All page content is in `lib/reibisch_web/controllers/page_html/home.html.heex`. Edit that file to update the page. No rebuild needed in dev — Phoenix reloads automatically.
