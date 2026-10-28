---
description: Generate Playwright checkout/order tests for QA Mart (totals, stock, auth)
agent: Mahesh QA Test Generator
---
Generate `tests/lab/orders.spec.ts` for the checkout/order flow: order total = subtotal - discount, quantity above stock is rejected, unauthenticated order access is refused. Use `api.placeOrder` and `products` from test data. Run the spec and report results.
