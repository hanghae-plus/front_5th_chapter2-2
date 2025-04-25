import { ProductAccordionItem } from "./product-accordion-item";

import { useProducts } from "../../../4_features/product/hooks";

export const ProductList = () => {
  const { products, updateProduct } = useProducts();

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductAccordionItem
          key={product.id}
          product={product}
          index={index}
          updateProduct={updateProduct}
        />
      ))}
    </div>
  );
};
