import { Coupon } from '../../types';
import { formatDiscountValue } from '../../utils/coupon';

interface Props {
  coupon: Coupon;
  index: number;
}

export const CouponCard = ({ coupon, index }: Props) => (
  <div
    key={coupon.code}
    data-testid={`coupon-${index + 1}`}
    className="bg-gray-100 p-2 rounded"
  >
    {coupon.name} ({coupon.code}):
    {formatDiscountValue(coupon.discountType, coupon.discountValue)} 할인
  </div>
);
