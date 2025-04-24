import { Product } from "@/types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  product: Product;
  setEditingProduct: Dispatch<SetStateAction<Product | null>>;
};

export const DiscountList = ({ product, setEditingProduct }: Props) => {
  // handleEditProduct 함수 수정
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  return (
    <div>
      {product.discounts.map((discount, index) => (
        <div key={index} className="mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
        </div>
      ))}
      <button
        data-testid="modify-button"
        onClick={() => handleEditProduct(product)}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
      >
        수정
      </button>
    </div>
  );
};
