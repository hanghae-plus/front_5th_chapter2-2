import { Button } from "../../common";
import { Product } from "../../../../types";
import { useProductManagement } from "../../../contexts/ProductManagementContext";
import { ProductManagementItemDiscountFormInput } from "./ProductManagementItemDiscountFormInput";

interface ProductManagementItemDiscountFormProps {
  product: Product;
}

export const ProductManagementItemDiscountForm = ({
  product,
}: ProductManagementItemDiscountFormProps) => {
  const { handleDiscountAdd, newDiscount, setNewDiscount } =
    useProductManagement();

  return (
    <div className="flex space-x-2">
      <ProductManagementItemDiscountFormInput
        field="quantity"
        type="number"
        placeholder="수량"
        value={newDiscount.quantity}
        onChange={(e) =>
          setNewDiscount({
            ...newDiscount,
            quantity: parseInt(e.target.value),
          })
        }
      />
      <ProductManagementItemDiscountFormInput
        field="rate"
        type="number"
        placeholder="할인율 (%)"
        value={newDiscount.rate * 100}
        onChange={(e) =>
          setNewDiscount({
            ...newDiscount,
            rate: parseInt(e.target.value) / 100,
          })
        }
      />
      <Button
        color="blue"
        width="third"
        className="p-2"
        onClick={() => handleDiscountAdd(product.id)}
      >
        할인 추가
      </Button>
    </div>
  );
};
