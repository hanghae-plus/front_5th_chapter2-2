import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { Coupon } from '@/types';
import { useCoupons } from '@/hooks/useCoupons';

const sampleCoupon = (overrides?: Partial<Coupon>): Coupon => ({
  name: '10% 할인 쿠폰',
  code: 'PERCENT10',
  discountType: 'percentage',
  discountValue: 10,
  ...overrides,
});

describe('useCoupons', () => {
  it('초기 쿠폰 목록을 상태로 가져와야 한다', () => {
    const defaultCoupons = [sampleCoupon({ code: 'C1' })];

    const { result } = renderHook(() => useCoupons(defaultCoupons));

    expect(result.current.coupons).toHaveLength(1);
    expect(result.current.coupons[0]).toEqual(defaultCoupons[0]);
  });

  it('새로운 쿠폰을 추가할 수 있어야 한다', () => {
    const { result } = renderHook(() => useCoupons([]));
    const newCoupon = sampleCoupon({ code: 'NEW_DISCOUNT_10' });

    act(() => {
      result.current.addCoupon(newCoupon);
    });

    expect(result.current.coupons).toHaveLength(1);
    expect(result.current.coupons[0]).toEqual(newCoupon);
  });
});
