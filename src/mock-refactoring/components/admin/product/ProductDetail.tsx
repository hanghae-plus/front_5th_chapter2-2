import { Product } from "../../../../types";

interface ProductDetailProps {
  product: Product;
  onEditClick: (product: Product) => void;
}

export const ProductDetail = ({ product, onEditClick }: ProductDetailProps) => {
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
        onClick={() => onEditClick(product)}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
      >
        수정
      </button>
    </div>
  );
};
