# API FAQ

Use the live [API FAQ](https://www.listennotes.com/api/faq/) and [terms](https://www.listennotes.com/api/terms/) for current wording. The following is a concise routing guide, not a replacement for those pages or legal advice.

## Product And Support

- Listen API provides podcast and episode search, structured metadata, discovery, playlists, and related operations that general catalog APIs may not provide.
- Listen Notes states that the API is actively supported and also powers ListenNotes.com.
- PRO and Enterprise customers receive prioritized email support at `hello@listennotes.com`; current support terms can change.
- The service reports serving customers at large request volumes, but do not promise capacity or an SLA beyond the user's contract.

## Data Freshness And Corrections

- Missing podcasts can be submitted to Listen Notes.
- Incorrect or stale metadata can be reported to `hello@listennotes.com` or corrected through available self-service tools.
- Do not promise immediate feed updates. Freshness depends on crawl timing and feed health.
- Use the documented RSS-refresh operation only for its intended workflow and plan.

## Caching And Attribution

- Current FREE/PRO policy allows client-side caching but restricts server-side storage of API responses.
- The FAQ currently allows server-side storage of podcast/episode IDs and publication dates, plus storage or processing of podcast audio files.
- Enterprise agreements can permit broader server-side storage.
- Current FREE/PRO terms require `Powered by Listen Notes` attribution on at least one screen or page displaying API data; Enterprise terms can differ.
- Violating quota or caching restrictions can lead to suspension.

Re-check the terms before implementing caching, indexing, data warehousing, or attribution.

## Rate Limits And Privacy

- Rate limits vary by plan, endpoint, and account history. Handle `429` rather than hardcoding requests-per-second assumptions.
- Listen Notes says API request logs include the calling device's IP address, user agent, endpoint, and parameters.
- Send calls from the developer's backend so end-user clients do not receive the API key.

## Audio, Removal, And No-Code

- Audio URLs may use a Listen Notes redirect so the destination can remain current while preserving podcast analytics.
- The FAQ states that applications may stream podcast audio, subject to applicable terms and laws.
- Content-removal requests can be directed through the documented deletion operation or to `hello@listennotes.com`.
- No-code platforms can call the API only if they provide a genuinely secret server-side REST integration. A browser-visible connector is not safe for the key.

## SDKs

Official libraries exist for several languages, but their coverage and maintenance can change. Reuse an installed official SDK when it fits the project; otherwise use direct REST calls verified against OpenAPI. Find current SDK links on the [tutorial index](https://www.listennotes.com/api/tutorials/).
