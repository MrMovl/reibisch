defmodule ReibischWeb.Projects do
  @moduledoc """
  Single source of truth for client projects.

  The projects page lists all of them. The home page shows the featured ones
  as a teaser, each linking to its section on the projects page. Anchor ids
  and links are derived here, so both pages always agree.

  Each project holds both languages side by side: `meta` and `body` appear on
  the projects page, `summary` is the one-liner on the home page and is only
  needed for featured projects.
  """

  @projects [
    %{
      tag: "01",
      featured: true,
      de: %{
        name: "KI auf eigener Hardware",
        summary: "Sprachmodell im eigenen Haus, mit kuratierter Wissensbasis",
        meta: "Künstliche Intelligenz · On-Premise · laufend",
        body:
          "Eine Oberfläche für ein Sprachmodell, das vollständig auf der Hardware des Kunden läuft. Zwei Arten von Daten bleiben im Haus: personenbezogene Nutzerdaten und das proprietäre Geschäftswissen. Für die Auswahl habe ich Beispiele aus dem Arbeitsalltag in automatische Tests verwandelt und auf verschiedenen Modellen und Hardware laufen lassen, um die beste Kombination für den konkreten Einsatz zu finden. Eine kuratierte Wissensbasis sorgt dafür, dass das Modell mit dem Wissen des Unternehmens arbeitet und nicht nur mit allgemeinem."
      },
      en: %{
        name: "AI on your own hardware",
        summary: "In-house language model with a curated knowledge base",
        meta: "Artificial intelligence · on-premise · ongoing",
        body:
          "An interface for a language model that runs entirely on the client's own hardware. Two kinds of data stay in-house: personal user data and proprietary business knowledge. To choose, I turned samples from day-to-day workflows into automated tests and ran them across different models and hardware, to find the best fit for the actual use. A curated knowledge base makes sure the model works with the company's own knowledge, not just general knowledge."
      }
    },
    %{
      tag: "02",
      featured: true,
      de: %{
        name: "Bildungsplattform",
        summary: "Lernplattform für Schulen",
        meta: "Bildung",
        body:
          "Lernplattform für Grundschulkinder. Als die Pandemie die Nutzerzahlen über Nacht in die Höhe trieb, habe ich die Plattform für den Ansturm skaliert und dafür gesorgt, dass sie auch auf der teils älteren Hardware läuft, die an Schulen im ganzen Land im Einsatz ist."
      },
      en: %{
        name: "Education platform",
        summary: "Learning platform for schools",
        meta: "Education",
        body:
          "Learning platform for primary school children. When the pandemic sent traffic through the roof overnight, I scaled the platform to handle the load and made sure it ran on the older hardware still in use in schools across the country."
      }
    },
    %{
      tag: "03",
      featured: true,
      de: %{
        name: "Dashboards & Visualisierung",
        summary: "Datenanalyse im SAP-Ökosystem",
        meta: "SAP-Ökosystem · Datenanalyse",
        body:
          "Werkzeuge, die Kennzahlen und Rohdaten verständlich und nutzbar machen. Der Anspruch: Fakten ehrlich abbilden, Daten so darstellen, dass sie die Wahrheit zeigen, statt eine bestimmte Wirkung zu erzwingen."
      },
      en: %{
        name: "Dashboards & visualization",
        summary: "Data analysis in the SAP ecosystem",
        meta: "SAP ecosystem · data analysis",
        body:
          "Tools that turn metrics and raw data into something usable and clear. The principle: present the facts honestly, show what the data actually says, rather than bending it toward a particular feeling or outcome."
      }
    },
    %{
      tag: "04",
      featured: true,
      de: %{
        name: "Tourismus-Apps",
        summary: "Mobile Apps für Tourismusbetriebe",
        meta: "Tourismus · mehrere Projekte",
        body:
          "Progressive Web Apps rund um kulturell bedeutsame Orte, kein kommerzielles Ausschlachten, sondern Inhalte mit Wert. Jeder Standort konnte eigene Funktionen beisteuern, was jedes Projekt eigen und abwechslungsreich machte."
      },
      en: %{
        name: "Tourism apps",
        summary: "Mobile apps for tourism businesses",
        meta: "Tourism · multiple projects",
        body:
          "Progressive web apps centred on culturally significant places, not commercial exploitation, but content with genuine value. Each site could contribute its own features, which made every project distinct and varied."
      }
    },
    %{
      tag: "05",
      featured: false,
      de: %{
        name: "Community-Plattform",
        meta: "Soziales Netzwerk · Startup",
        body:
          "Ein soziales Netzwerk, das Menschen über räumliche Nähe zusammenbringt: Wer in der Umgebung lebt, findet zueinander. Nicht globale Reichweite, sondern echte Verbindungen vor Ort. Eine andere Aufgabe als der übliche Feed, mit eigenen Anforderungen an Datenmodell und Privatsphäre."
      },
      en: %{
        name: "Community platform",
        meta: "Social network · startup",
        body:
          "A social network organised around where people actually live: those nearby find each other. Not global reach, but genuine local connection. A different kind of problem to the usual feed, with its own demands on data model and privacy."
      }
    }
  ]

  @doc "All projects in display order, localized to `lang`."
  def all(lang), do: Enum.map(@projects, &localize(&1, lang))

  @doc "Projects shown as a teaser on the home page, localized to `lang`."
  def featured(lang) do
    @projects
    |> Enum.filter(& &1.featured)
    |> Enum.map(&localize(&1, lang))
  end

  @doc "Path of the projects page for `lang`."
  def page_path("en"), do: "/projects"
  def page_path(_lang), do: "/projekte"

  @doc "DOM id of a project's section on the projects page."
  def anchor_id(%{tag: tag}), do: "project-" <> tag

  @doc "Link from anywhere on the site to a project's section."
  def href(lang, project), do: page_path(lang) <> "#" <> anchor_id(project)

  defp localize(project, "en"), do: Map.merge(%{tag: project.tag}, project.en)
  defp localize(project, _lang), do: Map.merge(%{tag: project.tag}, project.de)
end
