import { CardBox } from '../layout/CardBox.tsx';
import { Coupon } from '../../types';
import { formatDiscountValue } from '../../utils/coupon.ts';

interface Props {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  onChange: (coupon: Coupon) => void;
}

export const CouponSelectBox = ({
  coupons,
  selectedCoupon,
  onChange,
}: Props) => {
  return (
    <CardBox className="mt-4">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <select
        onChange={e => onChange(coupons[parseInt(e.target.value)])}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <option key={coupon.code} value={index}>
            {coupon.name} -{' '}
            {formatDiscountValue(
              coupon.discountType,
              coupon.discountValue
            )}{' '}
          </option>
        ))}
      </select>
      {selectedCoupon && (
        <p className="text-green-600">
          적용된 쿠폰: {selectedCoupon.name}(
          {formatDiscountValue(
            selectedCoupon.discountType,
            selectedCoupon.discountValue
          )}{' '}
          할인)
        </p>
      )}
    </CardBox>
  );
};
