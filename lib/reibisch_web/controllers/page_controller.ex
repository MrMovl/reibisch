defmodule ReibischWeb.PageController do
  use ReibischWeb, :controller

  def home(conn, _params) do
    render(conn, :home, lang: "de")
  end

  def home_en(conn, _params) do
    render(conn, :home, lang: "en")
  end

  def impressum(conn, _params) do
    render(conn, :imprint, lang: "de")
  end

  def imprint(conn, _params) do
    render(conn, :imprint, lang: "en")
  end

  def datenschutz(conn, _params) do
    render(conn, :privacy, lang: "de")
  end

  def privacy(conn, _params) do
    render(conn, :privacy, lang: "en")
  end
end
