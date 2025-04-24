import { Product } from "../../../../types";
import { Button } from "../../common";

interface ProductManagementItemViewProps {
  product: Product;
  handleEditProduct: (product: Product) => void;
}

export const ProductManagementItemView = ({
  product,
  handleEditProduct,
}: ProductManagementItemViewProps) => {
  return (
    <div>
      {product.discounts.map((discount, index) => (
        <div key={index} className="mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
        </div>
      ))}
      <Button
        data-testid="modify-button"
        onClick={() => handleEditProduct(product)}
        color="blue"
        className="px-2 py-1 mt-2"
      >
        수정
      </Button>
    </div>
  );
};
