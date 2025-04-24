import { memo } from 'react';
import type { Coupon } from '@/types';

interface CouponListItemProps {
  index: number;
  coupon: Coupon;
}

const CouponListItem = (props: CouponListItemProps) => {
  const { index, coupon } = props;

  return (
    <div
      key={index}
      className="bg-gray-100 p-2 rounded"
      data-testid={`coupon-${index + 1}`}
    >
      {coupon.name} ({coupon.code}):
      {coupon.discountType === 'amount'
        ? `${coupon.discountValue.toLocaleString()}원`
        : `${coupon.discountValue}%`}{' '}
      할인
    </div>
  );
};

export default memo(CouponListItem);
