import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://example.com/coupon', () => {
    return HttpResponse.json([
      {
        name: '5000원 할인 쿠폰',
        code: 'AMOUNT5000',
        discountType: 'amount',
        discountValue: 5000,
      },
      {
        name: '10% 할인 쿠폰',
        code: 'PERCENT10',
        discountType: 'percentage',
        discountValue: 10,
      },
    ]);
  }),
  http.post('https://example.com/coupon', async ({ request }) => {
    const newCoupon = await request.json();

    return HttpResponse.json(newCoupon, { status: 200 });
  }),
];
