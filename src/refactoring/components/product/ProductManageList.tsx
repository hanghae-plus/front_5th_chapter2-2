import { Product } from "../../../types";

interface ProductManageListProps {
  product: Product;
  isOpen: boolean;
  isEditing: boolean;
  onToggle: (productId: string) => void;
  onEditClick: (product: Product) => void;
  // testId: string;
}
export const ProductManageList = ({
  product,
  isOpen,
  isEditing,
  onToggle,
  onEditClick,
}:
ProductManageListProps) => {
  return (
    <>
      {/* 항상 보이는 헤더 부분 */}
      <button
        data-testid="toggle-button"
        onClick={() => onToggle(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>

      {/* 아코디언이 열렸을 때만 보이는 내용 */}
      {isOpen && !isEditing && (
        <div className="mt-2">
          {/* 할인 정보 표시 */}
          {product.discounts.map((discount, index) => (
            <div key={index} className="mb-2">
              <span>
                {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
              </span>
            </div>
          ))}
          {/* 수정 버튼 */}
          <button
            data-testid="modify-button"
            onClick={() => onEditClick(product)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
          >
            수정
          </button>
        </div>
      )}
    </>
  );
};
