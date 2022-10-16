# demo.podcastapi.com

Proof of concept work:

* create-react-app: it creates a single page app and compiles things from /public and /src into /build
  * Only one static html file is allowed, i.e., index.html
  * The react app takes care of routing
  * Theoretically, 404 is handled by 404.html. But it only allows one index.html and takes control of all routings.
  * No control over webpack configs
* functions: essentially Cloudflare Workers with routings
  * Routing based on file names, e.g., index.js => /, api/search.js => /api/search
  * Some uses:
    * AJAX endpoints to wrap 3rd party REST APIs (and hide api keys) and returns json, e.g., /api/search
    * Server-side rendering using HTMLRewriter to manipulate raw html
      * TODO: try server-side react rendering
    * Maybe some traditionally server-side tasks
