import { Coupon } from "../../6_shared/types";

export interface CouponFormData {
  name: string;
  code: string;
  discountType: "amount" | "percentage";
  discountValue: number;
}

export interface NewCouponFormProps {
  onSubmit: (coupon: CouponFormData) => void;
}

export interface CouponListProps {
  coupons: Coupon[];
}

export interface CouponItemProps {
  coupon: Coupon;
  index: number;
}

export interface CouponManagementPanelProps {
  title?: string;
}
