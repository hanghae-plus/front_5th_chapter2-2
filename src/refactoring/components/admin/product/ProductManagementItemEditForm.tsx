import { Product } from "../../../../types";
import { useProductManagement } from "../../../contexts/ProductManagementContext";
import { ProductManagementItemEditFormInput } from "./ProductManagementItemEditFormInput";

interface ProductManagementItemEditFormProps {
  product: Product;
}

export const ProductManagementItemEditForm = ({
  product,
}: ProductManagementItemEditFormProps) => {
  const { editingProduct, handleFieldUpdate } = useProductManagement();

  if (!editingProduct) return null;

  return (
    <>
      <ProductManagementItemEditFormInput
        field="name"
        label="상품명"
        type="text"
        value={editingProduct.name}
        onChange={(e) => handleFieldUpdate(product.id, "name", e.target.value)}
      />
      <ProductManagementItemEditFormInput
        field="price"
        label="가격"
        type="number"
        value={editingProduct.price}
        onChange={(e) =>
          handleFieldUpdate(product.id, "price", parseInt(e.target.value))
        }
      />
      <ProductManagementItemEditFormInput
        field="stock"
        label="재고"
        type="number"
        value={editingProduct.stock}
        onChange={(e) =>
          handleFieldUpdate(product.id, "stock", parseInt(e.target.value))
        }
      />
    </>
  );
};
