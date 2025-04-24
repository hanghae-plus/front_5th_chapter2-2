import { HTMLAttributes } from "react";
import { Coupon } from "../../types";

interface Props extends Coupon, HTMLAttributes<HTMLDivElement> {}

export const ExistingCouponItem: React.FC<Props> = ({
  name,
  code,
  discountType,
  discountValue,
  ...props
}: Props) => {
  return (
    <div {...props}>
      {name} ({code}):
      {discountType === "amount"
        ? `${discountValue}원`
        : `${discountValue}%`}{" "}
      할인
    </div>
  );
};
