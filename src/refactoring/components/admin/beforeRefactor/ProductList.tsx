import { Product } from "../../../../types";
import { useProductAccordion } from "../../../hooks/useProductAccordion";
import ProductItem from "./ProductItem";

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}

const ProductList = ({ products, onProductUpdate }: Props) => {
  const { openProductIds, toggleProductAccordion } = useProductAccordion();

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductItem
          key={product.id}
          product={product}
          index={index}
          isOpen={openProductIds.has(product.id)}
          toggleProductAccordion={toggleProductAccordion}
          onProductUpdate={onProductUpdate}
        />
      ))}
    </div>
  );
};

export default ProductList;
