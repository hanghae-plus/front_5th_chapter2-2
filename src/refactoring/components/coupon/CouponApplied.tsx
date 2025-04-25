import { Coupon } from '../../models/coupon/types';

interface Props {
  selectedCoupon: Coupon;
}

function CartCouponApplied({ selectedCoupon }: Props) {
  return (
    <div>
      <p className='text-green-600'>
        적용된 쿠폰: {selectedCoupon.name}(
        {selectedCoupon.discountType === 'amount'
          ? `${selectedCoupon.discountValue}원`
          : `${selectedCoupon.discountValue}%`}{' '}
        할인)
      </p>
    </div>
  );
}

export default CartCouponApplied;
