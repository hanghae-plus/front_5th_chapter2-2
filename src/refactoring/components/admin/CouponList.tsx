import { Coupon } from '../../../types';
import { H3 } from '../shared';
interface CouponListProps {
  coupons: Coupon[];
}
/**
 * 쿠폰 목록 컴포넌트
 * @param coupons 쿠폰 목록
 * @returns 쿠폰 목록 컴포넌트
 */
const CouponList = ({ coupons }: CouponListProps) => {
  return (
    <div>
      <H3>현재 쿠폰 목록</H3>
      <div className="space-y-2">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            data-testid={`coupon-${index + 1}`}
            className="bg-gray-100 p-2 rounded"
          >
            {coupon.name} ({coupon.code}):
            {coupon.discountType === 'amount'
              ? `${coupon.discountValue}원`
              : `${coupon.discountValue}%`}{' '}
            할인
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponList;
