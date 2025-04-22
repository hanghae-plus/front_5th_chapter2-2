import { useProductContext } from "@r/entities/product";

import { ProductCard } from "./product-card";

interface ProductListProps {}

export const ProductList: React.FC<ProductListProps> = () => {
  const { products } = useProductContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
