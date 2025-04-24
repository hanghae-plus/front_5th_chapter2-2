import { Product } from "../../../../types";
import { Button, Text } from "../../common";
import { useProductManagement } from "../../../contexts/ProductManagementContext";
interface ProductManagementItemViewProps {
  product: Product;
}

export const ProductManagementItemView = ({
  product,
}: ProductManagementItemViewProps) => {
  const { handleEditProduct } = useProductManagement();

  return (
    <div>
      {product.discounts.map((discount, index) => (
        <div key={index} className="mb-2">
          <Text>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </Text>
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
