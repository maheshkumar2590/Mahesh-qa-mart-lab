---
name: coupon-boundary-tests
description: Design boundary, equivalence and eligibility tests for QA Mart coupons. Use when asked to test coupons, discounts or checkout totals.
---
# Coupon boundary tests

Rules (from `app/server.js` and US-101):
| Code | Rule |
|---|---|
| SAVE10 | 10% off, floor, max ₹200 |
| FLAT100 | ₹100 off when subtotal is ₹500 or more (app wrongly uses `> 500`) |
| WELCOME50 | 50% off, max ₹250, first-order users only |
| SUMMER25 | expired |

Method: for each code test min-1, min, min+1, the cap edge (SAVE10: 1999/2000/2001), lowercase/padded input, empty and unknown codes. Call `POST /api/coupons/validate` via `api.validateCoupon(code, subtotal, email)`. Assert `valid`, `discount` and `message`. Use `test.each`-style loops over a data table.
