import { Coupon } from "../../../types";

interface SelectCouponProps {
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
}

export const SelectCoupon = ({ 
  coupons, 
  selectedCoupon, 
  applyCoupon 
}: SelectCouponProps) => {

  // onChange의 타입을 명시해주어야 한다. (e: React.ChangeEvent<HTMLSelectElement>)
  const handleSelectCoupon = (e: React.ChangeEvent<HTMLSelectElement>) => { 
    applyCoupon(coupons[parseInt(e.target.value)])
  } 

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <select
        onChange={handleSelectCoupon}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <option key={coupon.code} value={index}>
            {coupon.name} - {coupon.discountType === 'amount' ? `${coupon.discountValue}원` : `${coupon.discountValue}%`}
          </option>
        ))}
      </select>
      {selectedCoupon && (
        <p className="text-green-600">
          적용된 쿠폰: {selectedCoupon.name}
          ({selectedCoupon.discountType === 'amount' ? `${selectedCoupon.discountValue}원` : `${selectedCoupon.discountValue}%`} 할인)
        </p>
      )}
    </div>
  );
};