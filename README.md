# ListenApiDemo (Cloudflare Pages)

![Apache 2](https://img.shields.io/hexpm/l/plug.svg)

A simplified podcast search engine web app, using [Cloudflare Pages](https://pages.cloudflare.com/) (Javascript) and [Listen API](https://www.listennotes.com/api/).

In the [functions](https://developers.cloudflare.com/pages/platform/functions/) code, we use our [official podcast api package](https://github.com/ListenNotes/podcast-api-js) to talk to
Listen API.

You can find code snippets in different languages on the [API Docs](https://www.listennotes.com/api/docs/) page,
including [Node.js](https://github.com/ListenNotes/podcast-api-js),
[Python](https://github.com/ListenNotes/podcast-api-python),
[Ruby](https://github.com/ListenNotes/podcast-api-ruby),
[Java](https://github.com/ListenNotes/podcast-api-java),
[PHP](https://github.com/ListenNotes/podcast-api-php),
[Golang](https://github.com/ListenNotes/podcast-api-go),
[Kotlin](https://github.com/ListenNotes/podcast-api-kotlin)...

Note: You can easily implement similar apps using no code tools like [Bubble](https://www.listennotes.com/integrations/bubble/) and [Retool](https://www.listennotes.com/integrations/retool/).

<a href="https://www.listennotes.com/api/"><img src="https://raw.githubusercontent.com/ListenNotes/ListenApiDemo/master/web/src/powered_by_listennotes.png" width="300" /></a>

## Overview

Your frontend code (e.g., Web, iOS, Android...) shouldn't talk to Listen API directly.
For Web, your users can inspect request headers in their web browsers to find your API key,
if you use Ajax to hit Listen API endpoints directly.
For iOS / Android, you can't easily reset your API key, if you put API keys in the source code of your app.
Once the app is in the hands of your users, you can't easily change the code or force users to upgrade.

Typically, you'll hit Listen API endpoints from your backend (e.g., Django, Rails, Nodejs, Cloudflare Workers, Cloudflare Pages w/ functions...).
So you can protect your API key and reset it if needed.
Your frontend code will talk to your backend via GraphQL, RESTful APIs or the likes.

In this demo, we provide a reference implementation for a backend ([Cloudflare Pages functions](https://developers.cloudflare.com/pages/platform/functions/)) that talks to Listen API,
and a ReactJs implementation for a web frontend that talks to the Cloudflare Pages "backend" (functions).

## Running the project

### On your local dev

```
LISTEN_API_KEY=YOUR_SECRET_KEY yarn install && yarn dev
```

[Where to get LISTEN_API_KEY](https://help.listennotes.com/en/articles/3416436-how-to-get-an-api-token-of-listen-notes-api)?


If LISTEN_API_KEY is not set, then we'll use the [API mock server](https://www.listennotes.help/article/48-how-to-test-the-podcast-api-without-an-api-key) that returns fake data.

### Deploy to Cloudflare Pages

Please follow instructions on [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/get-started/) to deploy to production.

*On desktop*

![Desktop demo](https://github.com/wenbinf/ListenApiDemo/blob/master/resources/desktop.png)

*On mobile*

<img src="https://github.com/wenbinf/ListenApiDemo/blob/master/resources/mobile.png" alt="Mobile demo" width="300">

## Further readings

* [Listen API Documentation](https://www.listennotes.com/api/docs/)
* [Tutorials](https://www.listennotes.com/api/tutorials/)
* [Who's using Listen API?](https://www.listennotes.com/api/apps/)
* [General FAQ](https://www.listennotes.com/api/faq/)

What have 4,700+ companies & developers built with Listen Notes Podcast API:

*   [E-Learning Platforms](https://www.listennotes.com/use-cases/elearning-platforms/)
*   [Podcast Clipping Apps](https://www.listennotes.com/use-cases/podcast-clipping-apps/)
*   [Podcast Listening Apps](https://www.listennotes.com/use-cases/podcast-listening-apps/)
*   [Podcast Social Apps](https://www.listennotes.com/use-cases/podcast-social-apps/)
*   [Podcast PR / Advertising Platforms](https://www.listennotes.com/use-cases/podcast-pr-advertising-platforms/)
*   [Podcast Curation Apps](https://www.listennotes.com/use-cases/podcast-curation-apps/)
*   [Financial Market Intelligence Platforms](https://www.listennotes.com/use-cases/financial-market-intelligence-platforms/)
*   [Podcast Hosting Services](https://www.listennotes.com/use-cases/podcast-hosting-services/)
*   and [more](https://www.listennotes.com/api/apps/)...
