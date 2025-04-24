import { useState } from "react";
import { Product } from "../../../types";
import ProductEditMode from "./ProductEditMode";
import ProductViewMode from "./ProductViewMode";

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}

const AdminProductItem = ({ products, onProductUpdate }: Props) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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
    <div className="space-y-2">
      {products.map((product, index) => (
        <div
          key={product.id}
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
                <ProductEditMode
                  products={products}
                  product={product}
                  editingProduct={editingProduct}
                  setEditingProduct={setEditingProduct}
                  onProductUpdate={onProductUpdate}
                />
              ) : (
                <ProductViewMode product={product} setEditingProduct={setEditingProduct} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminProductItem;
