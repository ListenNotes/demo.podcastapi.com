# Account And Usage Workflows

## API Keys

Sign up the FREE plan at the [API pricing page](https://www.listennotes.com/api/pricing/).

Once you are approved, you can obtain keys through the [API dashboard](https://www.listennotes.com/api/dashboard/#apps) or the [API Docs page](https://www.listennotes.com/api/docs/). For multiple credentials, create multiple apps/tokens under the same account rather than creating extra accounts. Never ask the user to paste a key into chat or commit it to a repository.

Use a distinct secret per environment when the dashboard supports it. Rotate a compromised key at the dashboard and update the secret store without changing application code.

## Usage Monitoring

Read `X-ListenAPI-Usage` from API responses and compare it with the plan/quota information returned by documented headers or the dashboard. Header names are case-insensitive.

The current tutorial says `HEAD` requests can retrieve usage headers without counting toward usage. Verify the behavior in the live documentation before adding a monitoring job, and schedule checks conservatively.

Source: [usage tutorial](https://www.listennotes.help/article/44-how-to-check-how-many-requests-ive-used-in-this-billing-cycle).

## Mock Access

Use the mock base URL without a key for development and response-shape checks. It is not an anonymous production tier and does not return real search results. Follow [testing.md](testing.md) for its limits.

Source: [mock-server tutorial](https://www.listennotes.help/article/48-how-to-test-the-podcast-api-without-an-api-key).

## Account-Specific Help

Do not infer an account's plan, invoice, usage, or token state from generic documentation. Direct the user to the API dashboard or `hello@listennotes.com` for account-specific support.
