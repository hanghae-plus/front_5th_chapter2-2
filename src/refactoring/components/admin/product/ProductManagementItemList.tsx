import { ProductManagementItem } from "./ProductManagementItem";
import { Product } from "../../../../types";

interface ProductManagementItemListProps {
  products: Product[];
}

export const ProductManagementItemList = ({
  products,
}: ProductManagementItemListProps) => {
  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductManagementItem
          key={product.id}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
};
