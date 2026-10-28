---
description: Generate Playwright tests for QA Mart coupon rules (SAVE10, FLAT100, WELCOME50, SUMMER25)
agent: Mahesh QA Test Generator
---
Generate `tests/lab/coupons.spec.ts` for `${input:focus:coupon area, e.g. boundary or reuse}`.
Use the `coupon-boundary-tests` skill. Cover valid, boundary, expired, invalid and first-order-only cases through `api.validateCoupon`.
Run typecheck and the spec, then report pass/fail honestly, including any app bug found.
