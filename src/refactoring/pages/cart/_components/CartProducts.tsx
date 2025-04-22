import { useCart } from "#src/refactoring/pages/cart/_hooks/useCart";
import CartProduct from "./CartProduct";

const CartProducts: React.FC = () => {
  const { cart } = useCart();

  return (
    <ul className="space-y-2">
      {cart.map((cartItem) => (
        <CartProduct key={cartItem.product.id} cartItem={cartItem} />
      ))}
    </ul>
  );
};

export default CartProducts;
