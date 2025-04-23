import { useAtomValue, useSetAtom } from "jotai";
import { productsAtom, openProductIdsAtom } from "../../store/products/atom.ts";
import { toggleProductAccordionAtom } from "../../store/products/actions.ts";
import { ProductItem } from "./ProductItem.tsx";

export const ProductList = () => {
  const products = useAtomValue(productsAtom);
  const openProductIds = useAtomValue(openProductIdsAtom);
  const toggleProductAccordion = useSetAtom(toggleProductAccordionAtom);

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductItem
          key={product.id}
          product={product}
          index={index}
          isOpen={openProductIds.has(product.id)}
          onToggle={() => toggleProductAccordion(product.id)}
        />
      ))}
    </div>
  );
};
