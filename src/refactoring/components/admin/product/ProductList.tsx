import { useState } from "react";
import type { Product } from "../../../types";
import { ProductToggleButton } from "./ProductToggleButton";
import { UpdateProductForm } from "./UpdateProductForm";
import { DiscountInfo } from "./DiscountInfo";

interface ProductListProps {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}

export const ProductList = ({
  products,
  onProductUpdate,
}: ProductListProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  // handleEditProduct 함수 수정
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <div
          key={product.id}
          data-testid={`product-${index + 1}`}
          className="bg-white p-4 rounded shadow"
        >
          <ProductToggleButton
            product={product}
            setOpenProductIds={setOpenProductIds}
          />
          {openProductIds.has(product.id) && (
            <div className="mt-2">
              {editingProduct && editingProduct.id === product.id ? (
                <UpdateProductForm
                  products={products}
                  product={product}
                  onProductUpdate={onProductUpdate}
                  editingProduct={editingProduct}
                  setEditingProduct={setEditingProduct}
                />
              ) : (
                <div>
                  {product.discounts.map((discount, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <DiscountInfo key={index} discount={discount} />
                  ))}
                  <button
                    type="button"
                    data-testid="modify-button"
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                  >
                    수정
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
