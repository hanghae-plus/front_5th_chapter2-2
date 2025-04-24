import { useAtomValue } from "jotai";
import { productsAtom } from "../../store/products/atom.ts";
import { ProductItem } from "./ProductItem.tsx";

export const ProductList = () => {
  const products = useAtomValue(productsAtom);

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductItem key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};
