import { useEffect, useState } from 'react';
import { Coupon } from '../../types.ts';
import { getApi, postApi } from '../utils/apis.ts';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const getCouponInfo = async () => {
      const data = await getApi<Coupon[]>('https://example.com/coupon');
      setCoupons(data);
    };

    getCouponInfo();
  }, []);

  const addCoupon = async (newCoupon: Coupon) => {
    const createdCouponData = await postApi<Coupon, Coupon>('https://example.com/coupon', newCoupon);
    setCoupons((prev) => [...prev, createdCouponData]);
  };
  return { coupons, addCoupon };
};
