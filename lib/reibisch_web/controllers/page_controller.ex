defmodule ReibischWeb.PageController do
  use ReibischWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
