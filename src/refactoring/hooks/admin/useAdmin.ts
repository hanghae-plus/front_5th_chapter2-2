import { createContextHook } from '../../libs/createContextHook.tsx';
import { useAdminCoupon } from './useAdminCoupon.ts';
import { useAdminProduct } from './useAdminProduct.ts';

export const useAdminStore = () => {
  return {
    ...useAdminCoupon(),
    ...useAdminProduct()
  };
};

export const [AdminProvider, useAdmin] = createContextHook(useAdminStore);
