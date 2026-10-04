defmodule ReibischWeb.ProjectsTest do
  use ExUnit.Case, async: true

  alias ReibischWeb.Projects

  @langs ["de", "en"]

  test "every project is fully written in both languages" do
    for lang <- @langs, p <- Projects.all(lang), key <- [:name, :meta, :body] do
      assert is_binary(p[key]) and p[key] != "", "#{p.tag} (#{lang}) is missing #{key}"
    end
  end

  test "featured projects have a home page summary in both languages" do
    for lang <- @langs, p <- Projects.featured(lang) do
      assert is_binary(p[:summary]) and p.summary != "", "#{p.tag} (#{lang}) is missing summary"
    end
  end

  test "tags are unique, so anchors are unique" do
    tags = Enum.map(Projects.all("de"), & &1.tag)
    assert tags == Enum.uniq(tags)
  end

  test "links point to the projects page in the same language" do
    [p | _] = Projects.featured("de")
    assert Projects.href("de", p) == "/projekte#project-01"
    assert Projects.href("en", p) == "/projects#project-01"
  end
end
