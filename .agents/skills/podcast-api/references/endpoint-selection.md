# Endpoint Selection

Use this map to find a likely operation, then verify its exact contract in the live [OpenAPI YAML](https://listen-api.listennotes.com/api/v2/openapi.yaml). Do not infer request or response fields from this summary.

## Search

| Task | Operation | Use when |
| --- | --- | --- |
| Full-text search | `GET /search` | Search episodes, podcasts, or curated lists with filters and relevance/date sorting. |
| Episode-title lookup | `GET /search_episode_titles` | Match an individual episode title, optionally scoped by a Listen Notes, Apple Podcasts, Spotify, or RSS identifier. |
| Search suggestions | `GET /typeahead` | Provide low-latency query, genre, or podcast suggestions while typing. |
| Related queries | `GET /related_searches` | Suggest broader related terms when accuracy matters more than typeahead latency. |
| Spelling correction | `GET /spellcheck` | Correct a misspelled search phrase. |
| Trending queries | `GET /trending_searches` | Show recent trending searches on Listen Notes. |

## Directory And Discovery

| Task | Operation | Use when |
| --- | --- | --- |
| Podcast details and episodes | `GET /podcasts/{id}` | Fetch one podcast and page through its episodes. |
| Episode details | `GET /episodes/{id}` | Fetch one episode; verify transcript parameters and availability in OpenAPI. |
| Batch episode lookup | `POST /episodes` | Fetch metadata for multiple known episode IDs. |
| Batch podcast lookup | `POST /podcasts` | Resolve multiple Listen Notes, Apple Podcasts, Spotify, or RSS identifiers and optionally fetch latest episodes. |
| Popular podcasts | `GET /best_podcasts` | Browse podcasts by genre, region, language, publisher region, or popularity. |
| Podcast recommendations | `GET /podcasts/{id}/recommendations` | Find podcasts similar to a known podcast. |
| Episode recommendations | `GET /episodes/{id}/recommendations` | Find episodes similar to a known episode. |
| Random episode | `GET /just_listen` | Return one random episode for discovery. |
| Genre taxonomy | `GET /genres` | Fetch genres and parent-child relationships. |
| Supported regions | `GET /regions` | Populate valid regions for best-podcast queries. |
| Supported languages | `GET /languages` | Populate valid podcast-language filters. |
| Curated list details | `GET /curated_podcasts/{id}` | Fetch one editorially curated podcast list. |
| Curated list index | `GET /curated_podcasts` | Browse curated podcast lists. |
| Publisher-domain lookup | `GET /podcasts/domains/{domain_name}` | Find podcasts associated with a publisher's domain. |

## Playlists

| Task | Operation | Use when |
| --- | --- | --- |
| Playlist details and items | `GET /playlists/{id}` | Consume a Listen Later playlist as an episode or podcast list. |
| Account playlists | `GET /playlists` | List playlists belonging to the authenticated account. |

## Podcaster And Insights

| Task | Operation | Use when |
| --- | --- | --- |
| Submit podcast | `POST /podcasts/submit` | Ask Listen Notes to add a podcast feed. |
| Request podcast deletion | `DELETE /podcasts/{id}` | Ask Listen Notes to remove a podcast. |
| Refresh RSS | `POST /podcasts/{id}/rss` | Ask Listen Notes to refresh a known feed. |
| Audience demographics | `GET /podcasts/{id}/audience` | Fetch available podcast audience insights. |

Endpoint availability and result limits vary by plan. Read the operation description before promising that a feature is available.
