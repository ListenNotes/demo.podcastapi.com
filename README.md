# Podcast API Demo on Cloudflare Workers

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ListenNotes/demo.podcastapi.com)

![Apache 2](https://img.shields.io/hexpm/l/plug.svg)

A simplified podcast search engine web app using [Cloudflare Workers](https://workers.cloudflare.com/) and [Listen Notes Podcast API](https://www.listennotes.com/api/).

The React frontend calls this app's `/api/search` endpoint. The Worker keeps `LISTEN_API_KEY` server-side, calls Listen Notes through the official [podcast-api JavaScript package](https://github.com/ListenNotes/podcast-api-js), and serves the compiled React app as Cloudflare Worker static assets.

You can find code snippets in different languages on the [API Docs](https://www.listennotes.com/api/docs/) page, including [Node.js](https://github.com/ListenNotes/podcast-api-js), [Python](https://github.com/ListenNotes/podcast-api-python), [Ruby](https://github.com/ListenNotes/podcast-api-ruby), [Java](https://github.com/ListenNotes/podcast-api-java), [PHP](https://github.com/ListenNotes/podcast-api-php), [Golang](https://github.com/ListenNotes/podcast-api-go), and [Kotlin](https://github.com/ListenNotes/podcast-api-kotlin).

This repo also includes Podcast API agent guidance for building, debugging, and testing integrations. The broader reusable skill set lives in [podcastapi/skills](https://github.com/podcastapi/skills).

<a href="https://www.listennotes.com/api/"><img src="https://raw.githubusercontent.com/ListenNotes/ListenApiDemo/master/web/src/powered_by_listennotes.png" width="300" /></a>

## Overview

Your frontend code should not talk to Listen Notes Podcast API directly. Browser users can inspect request headers and find your API key if API requests are made directly from client-side JavaScript.

This demo provides a reference implementation for a Cloudflare Worker backend that talks to Listen Notes Podcast API, plus a React frontend that talks to the Worker via `/api/search`.

If `LISTEN_API_KEY` is not set, the Worker uses the [Listen Notes API mock server](https://www.listennotes.help/article/48-how-to-test-the-podcast-api-without-an-api-key), which returns fake data without spending quota.

## One-click Deploy

Click the button at the top of this README to deploy this public GitHub repository into your Cloudflare account.

During setup, Cloudflare will clone the repository, build the React app, deploy the Worker, and prompt for the `LISTEN_API_KEY` secret declared in `.dev.vars.example`.

If you skip the secret during setup, the deployed app still works against the mock API server. To fetch real podcast data later, add `LISTEN_API_KEY` in your Worker's Variables and Secrets settings.

## Local Development

Make sure you are using Node.js 22.

```bash
yarn install
cp .dev.vars.example .dev.vars
```

To use real Listen Notes API data locally, put your API key in `.dev.vars`:

```bash
LISTEN_API_KEY=your_api_key_here
```

Then run:

```bash
yarn dev
```

`yarn dev` builds the React app once, starts `wrangler dev` on port `8788`, and starts `react-scripts` on port `3000`. The React dev server proxies `/api` requests to the Worker.

## Manual Deploy

```bash
yarn build
yarn deploy
```

## Demo UI Screenshots

*On desktop*

<img width="1572" height="1172" alt="PodcastAPI.com demo on Desktop" src="https://github.com/user-attachments/assets/59582263-7f0b-49da-8c5b-94f819d80312" />

*On mobile*

<img width="400" height="868" alt="PodcastAPI.com demo on Mobile" src="https://github.com/user-attachments/assets/53937892-f567-4d5d-a23e-29ac12d78425" />

## Further Readings

* [Listen Notes API Documentation](https://www.listennotes.com/api/docs/)
* [Listen Notes API Tutorials](https://www.listennotes.com/api/tutorials/)
* [Cloudflare Deploy to Cloudflare buttons](https://developers.cloudflare.com/workers/platform/deploy-buttons/)
* [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
* [Who's using Listen Notes Podcast API?](https://www.listennotes.com/api/apps/)
