import { describe, it, expect } from 'vitest';
import type { CartItem, Coupon, Discount, Product } from '@/types';
import { calculateItemTotal, calculateCartTotal } from '@/models/total';

const createProduct = (overrides?: Partial<Product>): Product => ({
  id: 'p1',
  name: '테스트상품',
  price: 10000,
  stock: 100,
  discounts: [],
  ...overrides,
});

const createCartItem = (
  quantity: number,
  discounts: Discount[] = [],
): CartItem => ({
  product: createProduct({ discounts }),
  quantity,
});

describe('calculateItemTotal', () => {
  it('상품에 할인율이 적용된 최종 금액을 계산할 수 있어야 한다', () => {
    const item = createCartItem(10, [{ quantity: 10, rate: 0.1 }]);

    const result = calculateItemTotal(item);

    expect(result).toBe(90000);
  });

  it('할인이 없을 경우 원래 금액이 반환해야 한다', () => {
    const item = createCartItem(2, []);
    expect(calculateItemTotal(item)).toBe(20000);
  });
});

describe('calculateCartTotal', () => {
  it('장바구니의 모든 상품의 총 금액을 계산해야 한다', () => {
    const cart: CartItem[] = [
      createCartItem(5, [{ quantity: 5, rate: 0.1 }]),
      createCartItem(2, []),
    ];

    const result = calculateCartTotal(cart, null);

    expect(result).toEqual({
      totalBeforeDiscount: 70000,
      totalAfterDiscount: 65000,
      totalDiscount: 5000,
    });
  });

  it('정액 쿠폰이 적용된 최종 금액을 계산할 수 있어야 한다', () => {
    const cart: CartItem[] = [createCartItem(5, [{ quantity: 5, rate: 0.1 }])];
    const coupon: Coupon = {
      name: '5천원 할인',
      code: 'SAVE5000',
      discountType: 'amount',
      discountValue: 5000,
    };

    const result = calculateCartTotal(cart, coupon);

    expect(result).toEqual({
      totalBeforeDiscount: 50000,
      totalAfterDiscount: 40000,
      totalDiscount: 10000,
    });
  });

  it('비율 쿠폰이 적용된 최종 금액을 계산할 수 있어야 한다', () => {
    const cart: CartItem[] = [createCartItem(2, [])];
    const coupon: Coupon = {
      name: '10% 할인',
      code: 'PERCENT10',
      discountType: 'percentage',
      discountValue: 10,
    };

    const result = calculateCartTotal(cart, coupon);

    expect(result).toEqual({
      totalBeforeDiscount: 20000,
      totalAfterDiscount: 18000,
      totalDiscount: 2000,
    });
  });

  it('정액 쿠폰 적용 시 결제 금액이 0보다 작아지면 0으로 처리해야 한다', () => {
    const cart: CartItem[] = [createCartItem(1, [])];
    const coupon: Coupon = {
      name: '만 원 이상 할인',
      code: 'OVER10000',
      discountType: 'amount',
      discountValue: 15000,
    };

    const result = calculateCartTotal(cart, coupon);

    expect(result).toEqual({
      totalBeforeDiscount: 10000,
      totalAfterDiscount: 0,
      totalDiscount: 10000,
    });
  });
});
