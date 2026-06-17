ARG BUILDER_IMAGE="elixir:1.17-slim"
ARG RUNNER_IMAGE="nginx:1.27-alpine"

# ── Dev / build base ─────────────────────────────────────────────
# Elixir is only used to build the site. It never runs in production.
FROM ${BUILDER_IMAGE} AS dev

RUN apt-get update -y && apt-get install -y build-essential git inotify-tools \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mix local.hex --force && mix local.rebar --force

WORKDIR /app

CMD ["mix", "phx.server"]

# ── Builder: render templates to static HTML in _site/ ───────────
FROM dev AS builder

ENV MIX_ENV="prod"

COPY mix.exs mix.lock ./
RUN mix deps.get --only $MIX_ENV
RUN mkdir config
COPY config/config.exs config/prod.exs config/
RUN mix deps.compile

COPY lib lib
COPY priv priv
COPY config/runtime.exs config/

RUN mix build.static

# ── Runner: plain static files served by nginx, no BEAM ──────────
FROM ${RUNNER_IMAGE}

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/_site /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://localhost/ || exit 1
