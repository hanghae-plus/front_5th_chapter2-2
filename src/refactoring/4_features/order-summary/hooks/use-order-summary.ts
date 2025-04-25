import { useAtomValue } from "jotai";

import { orderSummaryAtom } from "../model";
import { calculateCouponAppliedTotal } from "../lib";
import { CartTotal } from "../../../6_shared/types";

export const useOrderSummary = (): CartTotal => {
  const { cartTotal, selectedCoupon } = useAtomValue(orderSummaryAtom);

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateCouponAppliedTotal(cartTotal, selectedCoupon);

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};
