import { createContext, useContext } from 'react';
import { Coupon } from '../../../entities';
import { useCoupons } from '../../hooks/useCoupon';

export interface CouponContextType {
  coupons: Coupon[];
  addCoupon: (newCoupon: Coupon) => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

const initialCoupons: Coupon[] = [
  {
    name: '5000원 할인 쿠폰',
    code: 'AMOUNT5000',
    discountType: 'amount',
    discountValue: 5000,
  },
  {
    name: '10% 할인 쿠폰',
    code: 'PERCENT10',
    discountType: 'percentage',
    discountValue: 10,
  },
];

interface CouponProviderProps {
  children: React.ReactNode;
}

const CouponProvider = ({ children }: CouponProviderProps) => {
  const { coupons, addCoupon } = useCoupons(initialCoupons);

  return (
    <CouponContext.Provider value={{ coupons, addCoupon }}>
      {children}
    </CouponContext.Provider>
  );
};

const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCouponContext must be used within a CouponProvider');
  }
  return context;
};

export { CouponProvider, useCouponContext, CouponContext };
