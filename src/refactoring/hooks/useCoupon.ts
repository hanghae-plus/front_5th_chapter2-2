import { Coupon } from '../../types.ts';
import { CURRENT_APPLY_INITIAL_COUPONS } from '../constants/initData.ts';
import useLocalStorage from './useLocalStorage.ts';

export const useCoupons = () => {
  const { value: coupons, setLocalStorageValue: setCoupons } = useLocalStorage<Coupon[]>(
    'coupons',
    CURRENT_APPLY_INITIAL_COUPONS
  );

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons([...coupons, newCoupon]);
  };

  return { coupons, addCoupon };
};
