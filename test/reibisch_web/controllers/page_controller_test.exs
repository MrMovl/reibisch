defmodule ReibischWeb.PageControllerTest do
  use ReibischWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, ~p"/")
    assert html_response(conn, 200) =~ "Your Business Name"
  end
end
