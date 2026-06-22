# Library And Sync Workflows

## One Podcast And Its Episodes

Use `GET /podcasts/{id}` to fetch a podcast and its episodes. The initial response contains a bounded episode page. Continue with the returned `next_episode_pub_date`; stop when the `episodes` array is empty, the cursor repeats, or the application's item bound is reached. Select recent-first or oldest-first ordering explicitly when order matters.

Source: [latest or all episodes tutorial](https://www.listennotes.help/article/39-how-to-get-latest-or-all-episodes-of-a-podcast).

## Multiple Podcasts And Subscription Refresh

Use `POST /podcasts` for batches of known podcast identifiers and optionally request latest episodes as documented by OpenAPI. Observe the current batch-size limit.

For subscription refresh:

1. Store the permitted podcast ID and latest known publication date for each subscription.
2. Batch-fetch podcast metadata.
3. Compare the returned latest publication date with the stored value.
4. Fetch episode pages only for podcasts that changed, or use the batch endpoint's latest-episode option when the product needs a smaller combined feed.

Do not poll without a schedule or request bound. Source: [subscription refresh tutorial](https://www.listennotes.help/article/40-how-to-fetch-new-episodes-for-subscribed-podcasts-using-podcast-api).

## External IDs And OPML

Use `POST /podcasts` to resolve batches of Listen Notes IDs, Apple Podcasts IDs, Spotify IDs, or RSS URLs using the exact request field documented for each identifier type.

For OPML import, parse the OPML with a structured XML parser, normalize RSS URLs, batch them within the endpoint limit, and preserve entries the API cannot resolve. For export, generate OPML from the user's subscription records and the podcast names/RSS URLs returned by the API. Do not use string concatenation to generate XML.

Sources: [external-ID lookup tutorial](https://www.listennotes.help/article/42-how-to-fetch-metadata-e-g-rss-episodes-of-podcasts-by-apple-podcasts-ids-itunes-ids-or-spotify-ids) and [OPML tutorial](https://www.listennotes.help/article/43-how-to-implement-import-opml-and-export-opml-in-a-podcast-app).

## IDs And Webhooks

Read podcast, episode, and playlist IDs from API responses. A human can also open an entity on ListenNotes.com and follow its “Use API to fetch this” link. Do not parse IDs from display URLs when a structured field is available.

Webhook setup is an account-dashboard operation. The current tutorial describes callbacks for podcast submission and deletion flows. Implement a public HTTPS callback that responds with `200`, authenticates or validates events using whatever mechanism the live dashboard/documentation provides, is idempotent, and does not trust an undocumented payload shape.

Sources: [finding IDs](https://www.listennotes.help/article/89-how-to-get-podcast-episode-playlist-ids-on-listen-notes) and [webhook tutorial](https://www.listennotes.help/article/49-how-to-use-webhooks-of-podcast-api).
