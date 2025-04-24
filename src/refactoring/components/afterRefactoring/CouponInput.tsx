import { useSetAtom } from "jotai";
import { updateNewCouponAtom } from "../../store/coupons/action";

/**
 * select 태그와 합칠 수도 있어서 type을 optional 값으로 정의하였습니다.
 */
interface Props {
  type?: "text" | "number";
  value: string | number;
  placeholder: string;
  field: "name" | "code";
}

const CouponInput = ({ value, placeholder, field, type }: Props) => {
  const updateNewCoupon = useSetAtom(updateNewCouponAtom);

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => updateNewCoupon({ field, value: e.target.value })}
      className="w-full p-2 border rounded"
    />
  );
};

export default CouponInput;
