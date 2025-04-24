import { Product } from "../../../../types";
import { useProductManagement } from "../../../contexts/ProductManagementContext";
import { ProductManagementItemDiscountForm } from "./ProductManagementItemDiscountForm";
import { ProductManagementItemDiscountItem } from "./ProductManagementItemDiscountItem";
interface ProductManagementItemDiscountProps {
  product: Product;
}

export const ProductManagementItemDiscount = ({
  product,
}: ProductManagementItemDiscountProps) => {
  const { editingProduct } = useProductManagement();

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      {editingProduct?.discounts.map((discount, index) => (
        <ProductManagementItemDiscountItem
          key={index}
          discount={discount}
          productId={product.id}
          index={index}
        />
      ))}
      <ProductManagementItemDiscountForm product={product} />
    </div>
  );
};
