# Playlists And Media Workflows

## Application Playlists

Two supported designs serve different ownership needs:

1. Store permitted episode IDs in the application's database, then use `POST /episodes` to hydrate bounded batches.
2. Let human curators manage a Listen Later playlist, then use `GET /playlists/{id}` as a headless content-management feed.

For a curated feed, choose the documented episode-list or podcast-list type and page with `last_timestamp_ms`. Preserve curator notes when the response provides them. Do not permanently mirror full API responses unless the applicable plan permits server-side storage.

Sources: [playlist tutorial](https://www.listennotes.help/article/45-how-to-build-a-playlist-for-episodes-in-a-podcast-app) and [human curation tutorial](https://www.listennotes.help/article/34-whats-the-easiest-way-for-our-human-content-curators-to-handpick-specific-podcasts-episodes-into-our-app-using-podcast-api).

## Transcripts

Use `GET /episodes/{id}` and verify the current transcript parameter and response field in OpenAPI. Treat transcripts as optional: most episodes do not have one. Design an explicit missing-transcript state.

If the product needs transcripts for episodes without them, retrieve the documented audio URL and integrate a separate speech-to-text service only when the user asks for that larger workflow. Do not imply that Podcast API itself transcribes arbitrary audio.

Source: [transcript tutorial](https://www.listennotes.help/article/35-how-to-get-transcripts-of-any-podcast-episodes-using-podcast-api).

## Audio And Clips

Use the episode audio URL from the API response for playback or downstream processing. Listen Notes audio URLs redirect to the podcast's current media URL; preserve redirect support in the HTTP player or downloader.

Clip creation is not a Podcast API endpoint. Download the audio only when the use case and applicable rights allow it, then use an audio tool such as FFmpeg to create a bounded clip. Keep media processing out of request handlers when it is slow or resource intensive.

Source: [clip tutorial](https://www.listennotes.help/article/19-how-to-create-audio-or-video-clips-for-a-specific-podcast-episode-using-podcast-api).

## Embedded Player

Derive the player URL by appending `embed/` to the response's `listennotes_url`, preserving the trailing slash. Render it in an iframe with an accessible title, lazy loading, and a responsive width. Do not expose the API key; the embedded player URL does not need it.

Source: [embedded-player tutorial](https://www.listennotes.help/article/36-do-you-provide-a-pre-built-embedded-podcast-player-that-i-can-put-on-my-website).
