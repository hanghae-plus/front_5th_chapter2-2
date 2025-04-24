import { ChangeEvent } from 'react';
import { Select } from '../ui';
import { Coupon } from '@/types';

interface CouponSelectProps {
  coupons: Coupon[];
  applyCoupon: (coupon: Coupon) => void;
  selectedCoupon: Coupon | null;
}

const getCouponOptions = (coupons: Coupon[]) => {
  const couponOptions = coupons.map(
    ({ code, name, discountType, discountValue }, index) => ({
      key: code,
      value: `${index}`,
      content: `${name} - ${discountValue}${
        discountType === 'amount' ? '원' : '%'
      }`,
    }),
  );
  couponOptions.unshift({
    key: 'coupon-default',
    value: '',
    content: '쿠폰 선택',
  });

  return couponOptions;
};

export const CouponSelect = ({
  coupons,
  applyCoupon,
  selectedCoupon,
}: CouponSelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    applyCoupon(coupons[parseInt(value)]);
  };

  return (
    <div className='mt-6 bg-white p-4 rounded shadow'>
      <h2 className='text-2xl font-semibold mb-2'>쿠폰 적용</h2>
      <Select
        name='coupon'
        options={getCouponOptions(coupons)}
        onChange={handleChange}
        className='w-full p-2 border rounded mb-2'
      ></Select>
      {selectedCoupon && (
        <p className='text-green-600'>
          적용된 쿠폰: {selectedCoupon.name}(
          {selectedCoupon.discountType === 'amount'
            ? `${selectedCoupon.discountValue}원`
            : `${selectedCoupon.discountValue}%`}{' '}
          할인)
        </p>
      )}
    </div>
  );
};
