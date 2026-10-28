# Mahesh-qa-plugin

GitHub Copilot agent plugin for testing **QA Mart** (Playwright + TypeScript). Protects three flows: **Login**, **Coupon validation**, **Checkout/Orders**.

## Install

From a clone of this repo:

```
copilot plugin install ./Mahesh-qa-plugin
```

From GitHub (subdirectory):

```
copilot plugin install <owner>/<repo>:Mahesh-qa-plugin
```

Verify with `copilot plugin list`.

## Components

| Type | Files |
|---|---|
| Custom instructions | `instructions/copilot-instructions.md`, `instructions/specs.instructions.md` |
| Prompt files | `prompts/coupon-tests`, `login-tests`, `order-tests` |
| Skills | `coupon-boundary-tests`, `failure-triage` |
| Custom agents | `Mahesh QA Test Generator` (edit/execute), `Mahesh QA Failure Triager` (read/execute only) |
| MCP servers | `qamart-playwright` (browser), `qamart-filesystem` (read-only tools) |
| Hooks | `guard-app.cjs` (preToolUse: blocks edits to `app/` and outside `tests/`, `pages/`), `post-edit-checks.cjs` (postToolUse: flags `waitForTimeout`, XPath, missing asserts) |

## Demo

Run the plugin-generated spec: `npx playwright test tests/lab/coupons.spec.ts --project=chromium`.
It includes an expected-fail test documenting the planted FLAT100 boundary bug (exactly ₹500 is rejected).

## Safety

No secrets in the repo; credentials come from `QA_USER` / `QA_PASS`. Agent tools are scoped and hooks guard source edits.
