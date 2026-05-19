defmodule Reibisch.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      ReibischWeb.Telemetry,
      {Phoenix.PubSub, name: Reibisch.PubSub},
      ReibischWeb.Endpoint
    ]

    opts = [strategy: :one_for_one, name: Reibisch.Supervisor]
    Supervisor.start_link(children, opts)
  end

  @impl true
  def config_change(changed, _new, removed) do
    ReibischWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
