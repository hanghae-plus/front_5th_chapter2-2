import { Coupon } from '../../../../types';
import { formatCouponDiscount } from '../../../utils/couponUtils';

interface CouponDropdownProps {
  coupons: Coupon[];
  onCouponSelect: (coupon: Coupon) => void;
}

export const CouponDropdown = ({ coupons, onCouponSelect }: CouponDropdownProps) => {
  return (
    <select
      onChange={(e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "") {
          // 선택 안함 옵션
          onCouponSelect(null as any);
        } else {
          onCouponSelect(coupons[parseInt(selectedValue)]);
        }
      }}
      className="w-full p-2 border rounded mb-2"
    >
      <option value="">쿠폰 선택</option>
      {coupons.map((coupon, index) => (
        <option key={coupon.code} value={index}>
          {coupon.name} - {formatCouponDiscount(coupon)}
        </option>
      ))}
    </select>
  );
}; 