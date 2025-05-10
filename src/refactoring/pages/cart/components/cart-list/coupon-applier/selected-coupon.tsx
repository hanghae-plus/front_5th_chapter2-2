import { useCartContext } from "@r/model/cart/cart-context";

export const SelectedCoupon = () => {
  const { selectedCoupon: coupon } = useCartContext();

  return (
    coupon && (
      <p className="text-green-600">
        적용된 쿠폰: {coupon.name}(
        {coupon.discountType === "amount"
          ? `${coupon.discountValue}원`
          : `${coupon.discountValue}%`}{" "}
        할인)
      </p>
    )
  );
};
