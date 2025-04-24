import { Product } from "../../types";
import { Button } from "./Button";

interface ItemAddCartButtonProps {
  product: Product;
  remainingStock: number;
  addToCart: (product: Product) => void;
}

// 장바구니에 추가 버튼
export const ItemAddCartButton = ({
  product,
  remainingStock,
  addToCart,
}: ItemAddCartButtonProps) => {
  return (
    <Button
      onClick={() => addToCart(product)}
      className={`w-full px-3 py-1 rounded ${
        remainingStock > 0
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={remainingStock <= 0}
      text={remainingStock > 0 ? "장바구니에 추가" : "품절"}
    />
  );
};
