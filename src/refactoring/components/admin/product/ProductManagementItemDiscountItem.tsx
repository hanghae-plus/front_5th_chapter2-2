import { Button, Text } from "../../common";
import { Discount } from "../../../../types";
import { useProductManagement } from "../../../contexts/ProductManagementContext";

interface ProductManagementItemDiscountProps {
  discount: Discount;
  productId: string;
  index: number;
}

export const ProductManagementItemDiscountItem = ({
  discount,
  productId,
  index,
}: ProductManagementItemDiscountProps) => {
  const { handleDiscountRemove } = useProductManagement();

  return (
    <div className="flex justify-between items-center mb-2">
      <Text>
        {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
      </Text>
      <Button
        color="red"
        className="px-2 py-1"
        onClick={() => handleDiscountRemove(productId, index)}
      >
        삭제
      </Button>
    </div>
  );
};
