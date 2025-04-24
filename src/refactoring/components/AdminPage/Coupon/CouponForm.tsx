import Select from '../../common/Select/index.tsx';

interface CouponFormProps {
  newCoupon: {
    name: string;
    code: string;
    discountType: 'amount' | 'percentage';
    discountValue: number;
  };
  updateCouponName: (name: string) => void;
  updateCouponCode: (code: string) => void;
  updateCouponDiscountType: (type: 'amount' | 'percentage') => void;
  updateCouponDiscountValue: (value: number) => void;
  addCoupon: () => void;
  discountTypeOptions: string[];
}

const CouponForm = ({
  newCoupon,
  updateCouponName,
  updateCouponCode,
  updateCouponDiscountType,
  updateCouponDiscountValue,
  addCoupon,
  discountTypeOptions,
}: CouponFormProps) => {
  return (
    <div className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="쿠폰 이름"
        value={newCoupon.name}
        onChange={(e) => updateCouponName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="쿠폰 코드"
        value={newCoupon.code}
        onChange={(e) => updateCouponCode(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <Select
          options={discountTypeOptions}
          value={newCoupon.discountType}
          onChange={(value) => updateCouponDiscountType(value as 'amount' | 'percentage')}
        />
        <input
          type="number"
          placeholder="할인 값"
          value={newCoupon.discountValue}
          onChange={(e) => updateCouponDiscountValue(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={addCoupon}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
};

export default CouponForm;
