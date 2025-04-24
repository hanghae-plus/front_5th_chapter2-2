import { Coupon } from '@/types';

interface CouponListProps {
  coupons: Coupon[];
}

export const CouponList = ({ coupons }: CouponListProps) => {
  return (
    <div>
      <h3 className='text-lg font-semibold mb-2'>현재 쿠폰 목록</h3>
      <div className='space-y-2'>
        {coupons.map(
          ({ name, code, discountType, discountValue }: Coupon, index) => (
            <div
              key={`coupon-${code}`}
              data-testid={`coupon-${index + 1}`}
              className='bg-gray-100 p-2 rounded'
            >
              {name} ({code}):
              {discountType === 'amount'
                ? `${discountValue}원`
                : `${discountValue}%`}{' '}
              할인
            </div>
          ),
        )}
      </div>
    </div>
  );
};
