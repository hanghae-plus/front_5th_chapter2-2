import { useCartContext } from "../../../contexts/CartContext";
import { useCouponContext } from "../../../contexts/CouponContext";
import { SelectBox } from "../../common/SelectBox";

export const CouponSelector = () => {
  const { coupons } = useCouponContext();
  const { applyCoupon, selectedCoupon } = useCartContext();

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
      <SelectBox
        value=""
        placeholder="쿠폰 선택"
        className="w-full p-2 border rounded mb-2"
        options={coupons.map((coupon, index) => ({
          label: `${coupon.name} - ${
            coupon.discountType === "amount"
              ? `${coupon.discountValue}원`
              : `${coupon.discountValue}%`
          }`,
          value: index,
        }))}
        onChange={(value) => applyCoupon(coupons[parseInt(value as string)])}
      />
      {selectedCoupon && (
        <p className="text-green-600">
          적용된 쿠폰: {selectedCoupon.name}(
          {selectedCoupon.discountType === "amount"
            ? `${selectedCoupon.discountValue}원`
            : `${selectedCoupon.discountValue}%`}{" "}
          할인)
        </p>
      )}
    </div>
  );
};
