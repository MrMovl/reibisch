defmodule Mix.Tasks.Build.Static do
  @moduledoc """
  Renders all pages to static HTML files in `_site/`.

  Usage:

      mix build.static

  The task:
    1. Compiles the project (so all HEEx templates are available)
    2. Renders each route's template inside the root layout
    3. Writes the results to `_site/` as clean-URL directories
    4. Copies static assets from `priv/static/` into `_site/`
  """
  use Mix.Task

  @output_dir "_site"

  # Each entry: {output_path, template_atom, assigns}
  @pages [
    {"index.html", :home, %{lang: "de"}},
    {"en/index.html", :home, %{lang: "en"}},
    {"impressum/index.html", :imprint, %{lang: "de"}},
    {"imprint/index.html", :imprint, %{lang: "en"}},
    {"datenschutz/index.html", :privacy, %{lang: "de"}},
    {"privacy/index.html", :privacy, %{lang: "en"}},
    {"projekte/index.html", :projekte, %{lang: "de"}},
    {"projects/index.html", :projekte, %{lang: "en"}},
    {"card/index.html", :card, %{lang: "de"}}
  ]

  # priv/static/index.html is the BEAM maintenance page; it must not overwrite
  # the rendered home page at _site/index.html.
  @skip_assets ~w(index.html)

  @impl Mix.Task
  def run(_args) do
    Mix.Task.run("compile")

    File.rm_rf!(@output_dir)
    File.mkdir_p!(@output_dir)

    for {path, template, assigns} <- @pages do
      render_page(path, template, assigns)
    end

    copy_static_assets()

    count = length(@pages)
    Mix.shell().info("Built #{count} pages → #{@output_dir}/")
  end

  defp render_page(output_path, template, assigns) do
    lang = Map.get(assigns, :lang, "de")

    # Render the page template (e.g. home.html.heex)
    inner = render_component(ReibischWeb.PageHTML, template, assigns)

    # Wrap in the app layout (pass-through)
    app_wrapped = render_component(ReibischWeb.Layouts, :app, %{inner_content: inner})

    # Wrap in the root layout, threading lang for <html lang=...>
    html =
      render_component(ReibischWeb.Layouts, :root, %{inner_content: app_wrapped, lang: lang})
      |> rendered_to_string()

    dest = Path.join(@output_dir, output_path)
    File.mkdir_p!(Path.dirname(dest))
    File.write!(dest, html)

    Mix.shell().info("  #{output_path}")
  end

  # embed_templates generates function components, not render/2.
  defp render_component(module, fun, assigns) do
    assigns =
      assigns
      |> Map.put_new(:__changed__, nil)
      |> Map.put_new(:flash, %{})

    apply(module, fun, [assigns])
  end

  defp rendered_to_string(rendered) do
    rendered
    |> Phoenix.HTML.Safe.to_iodata()
    |> IO.iodata_to_binary()
  end

  defp copy_static_assets do
    src = Application.app_dir(:reibisch, "priv/static")

    if File.dir?(src) do
      # Copy each item in priv/static/ to _site/
      src
      |> File.ls!()
      |> Enum.reject(&(&1 in @skip_assets))
      |> Enum.each(fn entry ->
        source = Path.join(src, entry)
        dest = Path.join(@output_dir, entry)

        if File.dir?(source) do
          File.cp_r!(source, dest)
        else
          File.cp!(source, dest)
        end
      end)

      Mix.shell().info("  Copied static assets from priv/static/")
    end
  end
end
