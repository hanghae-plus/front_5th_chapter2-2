import { useAdmin } from '../../../hooks';

export function CouponForm() {
  const { newCoupon, handleAddCoupon, setNewCoupon } = useAdmin();

  function handleChangeCouponName(e: React.ChangeEvent<HTMLInputElement>) {
    setNewCoupon({ ...newCoupon, name: e.target.value });
  }

  function handleChangeCouponCode(e: React.ChangeEvent<HTMLInputElement>) {
    setNewCoupon({ ...newCoupon, code: e.target.value });
  }

  function handleChangeCouponDiscountType(e: React.ChangeEvent<HTMLSelectElement>) {
    setNewCoupon({ ...newCoupon, discountType: e.target.value as 'amount' | 'percentage' });
  }

  function handleChangeCouponDiscountValue(e: React.ChangeEvent<HTMLInputElement>) {
    setNewCoupon({ ...newCoupon, discountValue: parseInt(e.target.value) });
  }

  function handleClickAddCoupon() {
    handleAddCoupon();
  }

  return (
    <div className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="쿠폰 이름"
        value={newCoupon.name}
        onChange={handleChangeCouponName}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="쿠폰 코드"
        value={newCoupon.code}
        onChange={handleChangeCouponCode}
        className="w-full p-2 border rounded"
      />

      <div className="flex gap-2">
        <select
          value={newCoupon.discountType}
          onChange={handleChangeCouponDiscountType}
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>

        <input
          type="number"
          placeholder="할인 값"
          value={newCoupon.discountValue}
          onChange={handleChangeCouponDiscountValue}
          className="w-full p-2 border rounded"
        />
      </div>

      <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600" onClick={handleClickAddCoupon}>
        쿠폰 추가
      </button>
    </div>
  );
}
