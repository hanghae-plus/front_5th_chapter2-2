import { CartList } from "./CartList";
import { Coupon } from "./Coupon";
import { Order } from "./Order";

export const Cart = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <CartList />
      <Coupon />
      <Order />
    </div>
  );
};
