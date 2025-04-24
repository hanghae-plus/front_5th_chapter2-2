import { formatCurrency, formatDiscountRate } from '@/features/cart/utils';
import { Coupon } from '@/types';

export const CartSelectedCoupon = ({ selectedCoupon }: { selectedCoupon: Coupon }) => {
  return (
    <p className="text-green-600">
      적용된 쿠폰: {selectedCoupon.name}(
      {selectedCoupon.discountType === 'amount'
        ? `${formatCurrency(selectedCoupon.discountValue)}`
        : `${formatDiscountRate(selectedCoupon.discountValue)}`}{' '}
      할인)
    </p>
  );
};
