import type { Coupon } from '../../../../types';
import OptionSelector from '../../ui/OptionSelector';

interface CouponSelectorProps {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  onSelect: (c: Coupon) => void;
}

const CouponSelector = (props: CouponSelectorProps) => {
  const { coupons, selectedCoupon, onSelect } = props;

  const label = (c: Coupon) => {
    const unit = c.discountType === 'amount' ? '원' : '%';

    return `${c.name} - ${c.discountValue}${unit}`;
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <OptionSelector
        options={coupons}
        placeholder="쿠폰 선택"
        renderLabel={label}
        onOptionChange={onSelect}
      />
      {selectedCoupon && (
        <p className="text-green-600">적용된 쿠폰: {label(selectedCoupon)}</p>
      )}
    </div>
  );
};
export default CouponSelector;
