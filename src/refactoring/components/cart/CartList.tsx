import { useCartContext } from "../../provider/CartProvider";

import CartListItem from "./CartListItem";

const CartList = () => {
  const { cart } = useCartContext();
  return (
    <div className="space-y-2">
      {cart.map((item) => (
        <CartListItem item={item} />
      ))}
    </div>
  );
};

export default CartList;
