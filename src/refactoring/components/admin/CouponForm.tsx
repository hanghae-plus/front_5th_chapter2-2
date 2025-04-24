import { Coupon, DiscountType } from '../../types';
import { Input } from '../shared/Input';

interface Props {
  newCoupon: Coupon;
  setNewCoupon: (coupon: Coupon) => void;
  onSubmit: () => void;
}

export const CouponForm = ({ newCoupon, setNewCoupon, onSubmit }: Props) => {
  return (
    <div className="space-y-2 mb-4">
      <Input
        id="coupon-name"
        type="text"
        placeholder="쿠폰 이름"
        value={newCoupon.name}
        onChange={e => setNewCoupon({ ...newCoupon, name: e.target.value })}
      />
      <Input
        id="coupon-code"
        type="text"
        placeholder="쿠폰 코드"
        value={newCoupon.code}
        onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value })}
      />
      <div className="flex gap-2">
        <select
          value={newCoupon.discountType}
          onChange={e =>
            setNewCoupon({
              ...newCoupon,
              discountType: e.target.value as DiscountType,
            })
          }
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <Input
          id="discount-value"
          type="number"
          placeholder="할인 값"
          value={newCoupon.discountValue}
          onChange={e =>
            setNewCoupon({
              ...newCoupon,
              discountValue: parseInt(e.target.value),
            })
          }
        />
      </div>
      <button
        onClick={onSubmit}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
};
