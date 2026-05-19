import Config

config :reibisch, ReibischWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [html: ReibischWeb.ErrorHTML, json: ReibischWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Reibisch.PubSub,
  live_view: [signing_salt: "tQ3HYlkX"]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :phoenix, :json_library, Jason

import_config "#{config_env()}.exs"
