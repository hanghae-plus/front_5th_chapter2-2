import { useState } from 'react';
import { Coupon } from '../../types.ts';

//데이터
const INITIAL_COUPON: Coupon = {
  name: '',
  code: '',
  discountType: 'percentage',
  discountValue: 0,
};

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  //쿠폰 추가
  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  //쿠폰관리 필드
  //새쿠폰 input-field
  const [newCoupon, setNewCoupon] = useState<Coupon>(INITIAL_COUPON);

  //input-field 초기화 - 액션
  const reset = () => setNewCoupon(INITIAL_COUPON);

  //새쿠폰 추가 - 액션
  const handleAddCoupon = () => {
    addCoupon(newCoupon);
    reset();
  };

  return { coupons, addCoupon, newCoupon, setNewCoupon, handleAddCoupon };
};
