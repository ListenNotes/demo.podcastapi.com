# Billing FAQ

Use the live [billing FAQ](https://www.listennotes.com/api/billing-faq/) and [pricing page](https://www.listennotes.com/api/pricing/) before quoting any amount, included quota, deposit, overage rate, or Enterprise threshold. Do not hardcode those volatile values in generated applications or answers.

## Stable Guidance

- A FREE plan is available without a credit card according to the current FAQ.
- Successful API endpoint responses with HTTP `200` count as API requests. Error responses, `HEAD` requests, image loads, audio playback, and webhook deliveries currently do not count.
- Exceeding FREE quota results in suspension or `429` responses until the billing cycle resets. Paid-plan overage behavior follows current pricing and contract terms.
- Changing between FREE and PRO does not require a new key unless the key is reset.
- PRO billing is monthly. Downgrades can cause immediate prorated billing under the current policy.
- Cancellation means remaining on FREE, downgrading PRO to FREE, or contacting support for Enterprise, as applicable.
- Payment details are handled by payment processors rather than stored directly by Listen Notes.
- Refund, failed-payment, deposit, zero-usage, and Enterprise terms are policy-sensitive; quote only after checking the live FAQ.

## Migration From V1

For a v1/RapidAPI migration, verify the latest migration instructions. The current FAQ describes changing the base host/version, using the v2 key in `X-ListenAPI-Key`, and contacting support when backward-compatible response behavior is needed. Do not assume v1 rate-limit headers exist in v2.

## Answering Billing Questions

1. Separate generic policy from the user's account-specific state.
2. Check the live billing FAQ and pricing calculator on the day of the answer.
3. State the plan and date associated with any quoted number.
4. Direct invoice, refund, failed-payment, unexpected-charge, and contract questions to `hello@listennotes.com`.
