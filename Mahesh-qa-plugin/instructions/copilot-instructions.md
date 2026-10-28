# QA Mart testing rules (Mahesh-qa-plugin)

- Stack: Playwright + TypeScript. App runs at http://localhost:3000 (`npm start`); config starts it automatically.
- Protected flows: **Login**, **Coupon validation** (SAVE10, FLAT100, WELCOME50, expired SUMMER25), **Checkout / Orders**.
- Write tests only in `tests/lab/` and page objects in `pages/`. Never edit `app/`. If a correct test fails, keep it and report the app bug.
- Reuse `tests/fixtures.ts` (`api`, `signedInPage`) and `tests/test-data.ts`. Never hard-code credentials; use `users`, which reads `QA_USER`/`QA_PASS`.
- Locators: `getByRole`, `getByLabel`, `getByTestId`. No XPath, no `waitForTimeout`; use web-first assertions.
- Each test is independent. Do not call `api.reset()` in tests that run in parallel with order-placing tests.
- Verify before finishing: `npm run typecheck`, then `npx playwright test <file> --project=chromium`. Report real results; never claim a pass you did not run.
