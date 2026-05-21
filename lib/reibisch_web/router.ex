defmodule ReibischWeb.Router do
  use ReibischWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {ReibischWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/", ReibischWeb do
    pipe_through :browser

    get "/", PageController, :home
    get "/en", PageController, :home_en
    get "/impressum", PageController, :impressum
    get "/imprint", PageController, :imprint
  end
end
