defmodule ReibischWeb.ConnCase do
  use ExUnit.CaseTemplate

  using do
    quote do
      use Phoenix.ConnTest
      import ReibischWeb.Router.Helpers
      @endpoint ReibischWeb.Endpoint
    end
  end

  setup _tags do
    {:ok, conn: Phoenix.ConnTest.build_conn()}
  end
end
