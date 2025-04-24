import { Coupon } from '@/types';
import { formatCurrency, formatDiscountRate } from '@/features/cart/utils';

export const CartCouponSelect = ({
  applyCoupon,
  coupons,
}: {
  applyCoupon: (coupon: Coupon) => void;
  coupons: Coupon[];
}) => {
  return (
    <select
      onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
      className="w-full p-2 border rounded mb-2"
    >
      <option value="">쿠폰 선택</option>
      {coupons.map((coupon, index) => (
        <option key={coupon.code} value={index}>
          {coupon.name} -{' '}
          {coupon.discountType === 'amount'
            ? `${formatCurrency(coupon.discountValue)}`
            : `${formatDiscountRate(coupon.discountValue)}`}
        </option>
      ))}
    </select>
  );
};
