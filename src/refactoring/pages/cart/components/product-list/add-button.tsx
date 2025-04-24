import { useCartContext } from "@r/model/cart/cart-context";
import { Product } from "@r/model/product/types";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  product: Product;
}

export const AddButton: React.FC<Props> = ({ product, disabled }) => {
  const { addToCart } = useCartContext();

  return (
    <button
      onClick={() => addToCart(product)}
      className={`w-full px-3 py-1 rounded ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
      disabled={disabled}
    >
      {disabled ? "품절" : "장바구니에 추가"}
    </button>
  );
};
