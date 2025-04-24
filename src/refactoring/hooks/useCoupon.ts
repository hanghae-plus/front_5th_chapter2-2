import { useState } from 'react';
import { Coupon } from '../../types.ts';
import { getInitialCoupon } from '../models/coupon.ts';

// 쿠폰 목록을 관리하는 커스텀 훅
export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (newCoupon: Coupon) =>
    setCoupons(addCouponToList(coupons, newCoupon));

  return {
    coupons,
    addCoupon,
  };
};

// (순수 함수) 새 쿠폰을 쿠폰 목록에 추가해 새로운 배열을 반환한다.
const addCouponToList = (coupons: Coupon[], newCoupon: Coupon) => [
  ...coupons,
  newCoupon,
];

// 관리자 페이지의 쿠폰 관리 기능을 위한 커스텀 훅
export const useCouponManage = (onCouponAdd: (newCoupon: Coupon) => void) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(getInitialCoupon());

  const handleAddCoupon = () => {
    if (newCoupon) {
      onCouponAdd(newCoupon);
      setNewCoupon(getInitialCoupon());
    }
  };

  const setCouponField = (field: keyof Coupon, value: unknown) => {
    setNewCoupon({ ...newCoupon, [field]: value });
  };

  return {
    newCoupon,
    handleAddCoupon,
    setCouponField,
  };
};
