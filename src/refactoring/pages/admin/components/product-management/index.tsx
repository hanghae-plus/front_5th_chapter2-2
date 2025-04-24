import { useProductContext } from "@r/model/product/product-context";
import { AddNewProduct } from "./add-new.product";
import { ProductAccordion } from "./product-accordion";

interface ProductManagementProps {}

export const ProductManagement: React.FC<ProductManagementProps> = ({}) => {
  const { products } = useProductContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <AddNewProduct />
      <div className="space-y-2">
        {products.map((product, index) => (
          <ProductAccordion
            key={product.id}
            data-testid={`product-${index + 1}`}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};
