import { Product } from "@/types";
import { useState } from "react";
import { ProductEditForm } from "./ProductEditForm";
import { ProductInfo } from "./ProductInfo";

interface Props {
  index: number;
  product: Product;
  products: Product[];
  updateProduct: (updatedProduct: Product) => void;
}

export const ProductCard = ({
  index,
  product,
  products,
  updateProduct
}: Props) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {openProductIds.has(product.id) && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === product.id ? (
            <ProductEditForm
              product={product}
              products={products}
              editingProduct={editingProduct}
              setEditingProduct={setEditingProduct}
              updateProduct={updateProduct}
            />
          ) : (
            <ProductInfo
              product={product}
              handleEditProduct={handleEditProduct}
            />
          )}
        </div>
      )}
    </div>
  );
};
