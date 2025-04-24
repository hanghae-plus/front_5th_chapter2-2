import { Coupon } from '../../types';
import { CouponCard } from './CouponCard';

interface Props {
  coupons: Coupon[];
}

export const CouponList = ({ coupons }: Props) => {
  if (coupons.length === 0) {
    return <p className="text-sm text-gray-500">등록된 쿠폰이 없습니다.</p>;
  }

  return (
    <div className="space-y-2">
      {coupons.map((coupon, index) => (
        <CouponCard key={index} coupon={coupon} index={index} />
      ))}
    </div>
  );
};
