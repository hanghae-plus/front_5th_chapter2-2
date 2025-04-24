import { Product } from "../../../../types";
import { Button } from "../../common";
import { ProductManagementItemDiscount } from "./ProductManagementItemDiscount";
import { ProductManagementItemEditForm } from "./ProductManagementItemEditForm";
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
      <ProductManagementItemEditForm product={product} />
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
