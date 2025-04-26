import { useProductContext } from "@r/provider/ProductProvider";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const { products } = useProductContext();

  return (
    <div className="space-y-2">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
