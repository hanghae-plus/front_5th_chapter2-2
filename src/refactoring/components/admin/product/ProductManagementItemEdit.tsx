import { Product } from "../../../../types";
import { Button } from "../../common";
import { ProductManagementItemEditInput } from "./ProductManagementItemEditInput";
import { ProductManagementItemDiscount } from "./ProductManagementItemDiscount";
import { useProductManagement } from "../../../contexts/ProductManagementContext";
interface ProductManagementItemEditProps {
  product: Product;
}

export const ProductManagementItemEdit = ({
  product,
}: ProductManagementItemEditProps) => {
  const { handleEditComplete } = useProductManagement();

  return (
    <div>
      <ProductManagementItemEditInput
        productId={product.id}
        field="name"
        label="상품명"
        type="text"
      />
      <ProductManagementItemEditInput
        productId={product.id}
        field="price"
        label="가격"
        type="number"
      />
      <ProductManagementItemEditInput
        productId={product.id}
        field="stock"
        label="재고"
        type="number"
      />
      <ProductManagementItemDiscount product={product} />
      <Button
        color="green"
        className="px-2 py-1 mt-2"
        onClick={handleEditComplete}
      >
        수정 완료
      </Button>
    </div>
  );
};
