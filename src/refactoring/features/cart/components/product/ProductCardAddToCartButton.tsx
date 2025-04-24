import { Product } from "@/types";

export const ProductCardAddToCartButton = ({
  isOutOfStock,
  addToCart,
  product
}: {
  isOutOfStock: boolean;
  addToCart: (product: Product) => void;
  product: Product;
}) => (
  <button
    onClick={() => addToCart(product)}
    className={`w-full px-3 py-1 rounded ${
      isOutOfStock
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }`}
    disabled={isOutOfStock}
  >
    {isOutOfStock ? "품절" : "장바구니에 추가"}
  </button>
);
