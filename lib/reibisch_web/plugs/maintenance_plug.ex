defmodule ReibischWeb.MaintenancePlug do
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    if Application.get_env(:reibisch, :maintenance_mode, false) do
      file = Application.app_dir(:reibisch, "priv/static/index.html")

      conn
      |> put_resp_content_type("text/html")
      |> send_file(200, file)
      |> halt()
    else
      conn
    end
  end
end
