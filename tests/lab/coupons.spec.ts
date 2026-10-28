import { test, expect } from '../fixtures';
import { users, coupons } from '../test-data';

// Generated with Mahesh-qa-plugin (coupon-boundary-tests skill).
test.describe('Coupon validation API', () => {
  const email = users.standard.email;

  const cases = [
    { title: 'SAVE10 gives 10% off', code: coupons.percent, subtotal: 1000, valid: true, discount: 100 },
    { title: 'SAVE10 is capped at ₹200', code: coupons.percent, subtotal: 2001, valid: true, discount: 200 },
    { title: 'SAVE10 accepts lowercase input', code: 'save10', subtotal: 1000, valid: true, discount: 100 },
    { title: 'FLAT100 is accepted above ₹500', code: coupons.flat, subtotal: 501, valid: true, discount: 100 },
    { title: 'FLAT100 is rejected below ₹500', code: coupons.flat, subtotal: 499, valid: false },
    { title: 'expired coupon is rejected', code: coupons.expired, subtotal: 1000, valid: false },
    { title: 'unknown coupon is rejected', code: 'NOPE', subtotal: 1000, valid: false },
    { title: 'empty coupon is rejected', code: '', subtotal: 1000, valid: false },
  ];

  for (const c of cases) {
    test(`${c.title} @regression`, async ({ api }) => {
      const { status, body } = await api.validateCoupon(c.code, c.subtotal, email);
      expect(status).toBe(c.valid ? 200 : 422);
      expect(body.valid).toBe(c.valid);
      if (c.valid) expect(body.discount).toBe(c.discount);
    });
  }

  test('FLAT100 is accepted at exactly ₹500 @regression', async ({ api }) => {
    test.fail(true, 'BUG: FLAT100 uses subtotal > 500; story US-101 says ₹500 or more');
    const { body } = await api.validateCoupon(coupons.flat, 500, email);
    expect(body.valid).toBe(true);
    expect(body.discount).toBe(100);
  });
});
