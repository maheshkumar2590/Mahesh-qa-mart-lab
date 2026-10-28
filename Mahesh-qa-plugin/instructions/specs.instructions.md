---
applyTo: "tests/**/*.spec.ts"
---
# Spec conventions

- Import `test`/`expect` from `../fixtures` (not `@playwright/test`) when using `api` or `signedInPage`.
- Name tests as behaviour: `FLAT100 is accepted at exactly ₹500`. Group with `test.describe`.
- Assert status codes AND body fields for API tests.
- Tag with `@smoke` or `@regression` in the title.
- Known planted bug: FLAT100 rejects exactly ₹500 (story says ₹500 or more). Write the correct assertion and mark it `test.fail(true, 'BUG: ...')` so the suite stays green and flips when fixed.
