import { useCart } from "../../../4_features/cart/hooks";
import { useProduct } from "../../../4_features/product/hooks";
import { AddToCartButtonProps } from "../types";

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
}) => {
  const { addToCart } = useCart();
  const { remainingStock } = useProduct(product);

  const disabled = remainingStock <= 0;

  const handleAddToCartClick = () => addToCart(product);

  return (
    <button
      data-testid={`add-to-cart-${product.id}`}
      onClick={handleAddToCartClick}
      className={`w-full px-3 py-1 rounded ${
        remainingStock > 0
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={disabled}
    >
      {disabled ? "품절" : "장바구니에 추가"}
    </button>
  );
};
