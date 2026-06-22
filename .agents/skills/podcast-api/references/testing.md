# Testing

## Mock Server Contract

Use `https://listen-api-test.listennotes.com/api/v2` without `X-ListenAPI-Key` for safe integration tests. It returns hardcoded fake data.

The mock server has three important limitations:

1. The same endpoint returns the same fake response regardless of query parameters.
2. It cannot validate search relevance, filters, sorting, plan behavior, pagination semantics, or data freshness.
3. It may be unavailable occasionally.

Therefore, use it only to verify URL construction, HTTP transport, parsing, and broad response shape. See the official [mock-server tutorial](https://www.listennotes.help/article/48-how-to-test-the-podcast-api-without-an-api-key).

## Test Layers

1. Unit-test application behavior with local mocks or fixtures.
   - Assert the chosen method, path, encoded query, body, and header names.
   - Assert that the API-key value is never returned to or serialized for a client.
   - Cover `400`, `401`, `404`, `429`, network failures, and malformed JSON as relevant.
   - Cover empty results, missing optional fields, repeated cursors, and maximum-page guards.
2. Add a mock-server integration test when network tests fit the repository.
   - Inject the mock base URL through configuration.
   - Omit the API key.
   - Assert transport and parsing only.
   - Skip or classify the test appropriately if the mock service is unavailable.
3. Keep production verification opt-in.
   - Do not require `LISTEN_API_KEY` in ordinary CI.
   - Do not send live requests merely to prove generated code works.
   - If the user explicitly requests a live test, use the smallest bounded request and do not print response headers that may contain account information.

## Framework Checks

- For server-rendered or full-stack web frameworks, confirm the request runs in a server route, server action, loader, or backend service rather than a client component.
- For mobile and desktop clients, place the credentialed request behind a backend owned by the application developer.
- For edge or serverless runtimes, use that platform's secret store and supported HTTP APIs.
- For reusable libraries, accept the API key and base URL through explicit server-side configuration; never read browser-global environment values.
