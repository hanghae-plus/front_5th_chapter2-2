import { useProductsContext } from "../hooks/index.ts";
import { AdminProduct } from "./AdminProduct.tsx";

export const AdminProductList = () => {
  const { products, updateProduct } = useProductsContext();

  const getProductById = (productId: string) =>
    products.find((p) => p.id === productId);

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <AdminProduct
          key={product.id}
          product={product}
          index={index}
          onProductUpdate={updateProduct}
          getProductById={getProductById}
        />
      ))}
    </div>
  );
};
