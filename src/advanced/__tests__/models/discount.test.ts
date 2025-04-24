import { describe, it, expect } from 'vitest';
import {
  getMaxApplicableDiscount,
  calculateItemDiscountTotal,
  getAppliedDiscount,
  getMaxDiscount,
} from '@/models/discount';
import type { CartItem, Discount, Product } from '@/types';

const createProduct = (discounts: Discount[] = []): Product => ({
  id: 'p1',
  name: '테스트상품',
  price: 10000,
  stock: 100,
  discounts,
});

const createCartItem = (
  quantity: number,
  discounts: Discount[] = [],
): CartItem => ({
  product: createProduct(discounts),
  quantity,
});

describe('getMaxApplicableDiscount', () => {
  it('적용 가능한 최대 할인율을 반환해야 한다', () => {
    const item = createCartItem(10, [
      { quantity: 5, rate: 0.1 },
      { quantity: 10, rate: 0.2 },
      { quantity: 20, rate: 0.3 },
    ]);

    const result = getMaxApplicableDiscount(item);

    expect(result).toBe(0.2);
  });

  it('할인 조건을 만족하지 않으면 0을 반환해야한다', () => {
    const item = createCartItem(2, [{ quantity: 5, rate: 0.1 }]);

    const result = getMaxApplicableDiscount(item);

    expect(result).toBe(0);
  });
});

describe('calculateItemDiscountTotal', () => {
  it('할인을 적용한 총 금액을 반환해야 한다', () => {
    const item = createCartItem(10, [{ quantity: 10, rate: 0.2 }]);
    const total = 10000;

    const result = calculateItemDiscountTotal(total, item);

    expect(result).toBe(8000);
  });

  it('할인이 없으면 총 금액 반환해야 한다', () => {
    const item = createCartItem(1, []);

    const result = calculateItemDiscountTotal(10000, item);

    expect(result).toBe(10000);
  });
});

describe('getAppliedDiscount', () => {
  it('상품에 적용된 할인율을 반환해야 한다', () => {
    const item = createCartItem(15, [
      { quantity: 10, rate: 0.1 },
      { quantity: 5, rate: 0.05 },
      { quantity: 15, rate: 0.2 },
    ]);

    const result = getAppliedDiscount(item);

    expect(result).toBe(0.2);
  });

  it('할인 목록이 없으면 0을 반환해야 한다', () => {
    const item = createCartItem(3, []);

    const result = getAppliedDiscount(item);

    expect(result).toBe(0);
  });
});

describe('getMaxDiscount', () => {
  it('가장 큰 할인율을 반환해야 한다', () => {
    const discounts: Discount[] = [
      { quantity: 1, rate: 0.1 },
      { quantity: 5, rate: 0.2 },
      { quantity: 10, rate: 0.3 },
    ];

    const result = getMaxDiscount(discounts);

    expect(result).toBe(0.3);
  });

  it('빈 배열이면 0을 반환해야 한다', () => {
    expect(getMaxDiscount([])).toBe(0);
  });
});
