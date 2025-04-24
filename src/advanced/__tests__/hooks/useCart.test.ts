import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useCart } from '@/hooks/useCart';
import type { Product, Coupon } from '@/types';

const sampleProduct = (overrides?: Partial<Product>): Product => ({
  id: 'p1',
  name: '샘플상품',
  price: 10000,
  stock: 10,
  discounts: [],
  ...overrides,
});

const percentCoupon: Coupon = {
  name: '10% 할인',
  code: 'PERCENT10',
  discountType: 'percentage',
  discountValue: 10,
};

const setupCart = () => {
  localStorage.clear();
  return renderHook(() => useCart()).result;
};

describe('useCart', () => {
  it('상품을 장바구니에 추가할 수 있어야 한다.', () => {
    const result = setupCart();
    const product = sampleProduct();

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].product.id).toBe('p1');
  });

  it('상품을 장바구니에서 제거할 수 있어야 한다', () => {
    const result = setupCart();
    const product = sampleProduct();

    act(() => {
      result.current.addToCart(product);
      result.current.removeFromCart('p1');
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('특정 상품의 수량을 변경할 수 있어야 한다', () => {
    const result = setupCart();
    const product = sampleProduct();

    act(() => {
      result.current.addToCart(product);
      result.current.updateQuantity('p1', 5);
    });

    expect(result.current.cart[0].quantity).toBe(5);
  });

  it('쿠폰을 선택할 수 있어야 한다', () => {
    const result = setupCart();

    act(() => {
      result.current.applyCoupon(percentCoupon);
    });

    expect(result.current.selectedCoupon).toEqual(percentCoupon);
  });

  it('할인이 적용된 총 금액을 계산할 수 있어야 한다', () => {
    const result = setupCart();
    const product = sampleProduct({ discounts: [{ quantity: 1, rate: 0.1 }] });

    act(() => {
      result.current.addToCart(product);
      result.current.applyCoupon(percentCoupon);
    });

    const total = result.current.calculateTotal();
    expect(total.totalBeforeDiscount).toBe(10000);
    expect(total.totalAfterDiscount).toBe(8100);
    expect(total.totalDiscount).toBe(1900);
  });

  it('특정 상품의 재고를 확인할 수 있어야 한다', () => {
    const result = setupCart();
    const product = sampleProduct({ stock: 5 });

    act(() => {
      result.current.addToCart(product);
      result.current.updateQuantity('p1', 3);
    });

    const remaining = result.current.getRemainingStock(product);
    expect(remaining).toBe(2);
  });
});
