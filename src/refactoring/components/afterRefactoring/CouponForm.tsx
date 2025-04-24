import { useAtomValue, useSetAtom } from "jotai";
import { newCouponAtom } from "../../store/coupons/atom.ts";
import { handleAddCouponAtom } from "../../store/coupons/action.ts";
import CouponInput from "./CouponInput.tsx";
import CouponSelect from "./CouponSelect.tsx";

export const CouponForm = () => {
  const newCoupon = useAtomValue(newCouponAtom);
  const handleAddCoupon = useSetAtom(handleAddCouponAtom);

  return (
    <div className="space-y-2 mb-4">
      <CouponInput
        type={"text"}
        value={newCoupon.name}
        placeholder="쿠폰 이름"
        field="name"
      />

      <CouponInput
        type={"text"}
        value={newCoupon.code}
        placeholder="쿠폰 코드"
        field="code"
      />
      <div className="flex gap-2">
        <CouponSelect value={newCoupon.discountType} />
      </div>

      <button
        onClick={() => handleAddCoupon()}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
};
