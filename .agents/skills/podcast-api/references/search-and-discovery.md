# Search And Discovery Workflows

Verify every parameter against the live [OpenAPI document](https://listen-api.listennotes.com/api/v2/openapi.yaml).

## General Search

Use `GET /search` for full-text search over episodes, podcasts, or curated lists. Select the response type deliberately, pass filters only when the user asks for them, and paginate with the returned `next_offset`.

For episodes from a small known set of podcasts, pass their Listen Notes podcast IDs through `ocid`; the current contract allows a limited set, so verify the maximum before implementing validation.

## Finding A Podcast By Name

For precise podcast-name search, use `GET /search` with podcast results and restrict matching to title and publisher/author fields. Quote the query when the user needs a verbatim match. For interactive suggestions, prefer `GET /typeahead` with podcast suggestions enabled.

Do not claim a search is exact merely because it is quoted. Preserve a no-result path and let the user disambiguate multiple candidates.

## Search Experiences

Combine endpoints by interaction rather than calling all of them automatically:

- `GET /typeahead`: fast suggestions while the user types.
- `GET /spellcheck`: correction for a submitted misspelled phrase.
- `GET /related_searches`: more comprehensive related queries after submission.
- `GET /trending_searches`: recent popular search terms.
- `GET /search_episode_titles`: import or match a specific episode by title and external podcast identifier.
- `GET /search`: full results and filters.

See the official [search tutorial](https://www.listennotes.help/article/38-use-podcast-search-apis).

## Genres And Charts

Use `GET /genres` for the genre hierarchy. Relate a child to its parent using `parent_id`; request only top-level genres when that is all the UI needs.

Use `GET /best_podcasts` for country-, language-, or genre-oriented charts. To rank by the Listen Score popularity metric, use the sort value currently documented by OpenAPI. Page with the response's `next_page_number`.

Sources: [genre tutorial](https://www.listennotes.help/article/46-how-to-get-sub-genres-for-a-particular-podcast-genre-using-podcast-api), [popular podcasts tutorial](https://www.listennotes.help/article/37-how-to-get-popular-podcasts-by-country-category-using-podcast-api), and [accurate name-search tutorial](https://www.listennotes.help/article/47-how-to-get-more-accurate-search-results-when-searching-podcast-names-using-podcast-api).
