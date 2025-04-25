import { useCouponAdmin } from './hook.ts';
import { Coupon } from '../../../../../../types.ts';

interface Props {
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AddCoupon = ({ onCouponAdd }: Props) => {
  const { newCoupon, handleAddCoupon, changeCouponHandler } =
    useCouponAdmin(onCouponAdd);

  return (
    <div className='space-y-2 mb-4'>
      <input
        type='text'
        placeholder='쿠폰 이름'
        value={newCoupon.name}
        onChange={changeCouponHandler('name')}
        className='w-full p-2 border rounded'
      />
      <input
        type='text'
        placeholder='쿠폰 코드'
        value={newCoupon.code}
        onChange={changeCouponHandler('code')}
        className='w-full p-2 border rounded'
      />
      <div className='flex gap-2'>
        <select
          value={newCoupon.discountType}
          onChange={changeCouponHandler('discountType')}
          className='w-full p-2 border rounded'
        >
          <option value='amount'>금액(원)</option>
          <option value='percentage'>할인율(%)</option>
        </select>
        <input
          type='number'
          placeholder='할인 값'
          value={newCoupon.discountValue}
          onChange={changeCouponHandler('discountValue')}
          className='w-full p-2 border rounded'
        />
      </div>
      <button
        onClick={handleAddCoupon}
        className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600'
      >
        쿠폰 추가
      </button>
    </div>
  );
};
