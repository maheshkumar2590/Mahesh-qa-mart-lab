---
description: Generate Playwright login tests for QA Mart (valid, invalid, locked user)
agent: Mahesh QA Test Generator
---
Generate `tests/lab/login.spec.ts` covering: standard user reaches /products, wrong password shows an error, locked user (`users.locked`) is refused, empty form is rejected.
Inspect `app/public/login.html` first (read-only) for exact labels and messages. Use `getByLabel`/`getByRole`. Run the spec and report results.
