import { Coupon } from '../../refactoring/types';
import { useLocalStorageState } from './useLocalStorage.ts';

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useLocalStorageState<Coupon[]>(
    'coupons',
    initialCoupons
  );

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prevCoupons => [...prevCoupons, coupon]);
  };

  return { coupons, addCoupon };
};
