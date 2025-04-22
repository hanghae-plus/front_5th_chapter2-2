import { Product } from "@/types";
import { ProductAccordion } from "./product-accordion";
import { AddNewProduct } from "./add-new-product";

interface ProductManagementProps {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const ProductManagement: React.FC<ProductManagementProps> = ({
  products,
  onProductUpdate,
  onProductAdd,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <AddNewProduct onProductAdd={onProductAdd} />
      <div className="space-y-2">
        {products.map((product, index) => (
          <ProductAccordion
            key={product.id}
            data-testid={`product-${index + 1}`}
            product={product}
            onProductUpdate={onProductUpdate}
            products={products}
          />
        ))}
      </div>
    </div>
  );
};
