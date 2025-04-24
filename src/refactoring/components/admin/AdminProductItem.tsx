import EditProductForm from "./EditProductForm.tsx";
import { Product } from "../../../types.ts";
import { useState } from "react";

export default function AdminProductItem({
  product,
  onProductUpdate,
  testId,
}: {
  testId: string;
  onProductUpdate: (updatedProduct: Product) => void;
  product: Product;
}) {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const toggleProductAccordion = (productId: string) =>
    setOpenProductIds(
      (prev) =>
        new Set(
          prev.has(productId)
            ? [...prev].filter((id) => id !== productId)
            : [...prev, productId],
        ),
    );

  const handleEditComplete = (updatedProduct: Product) => {
    onProductUpdate(updatedProduct);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  return (
    <div data-testid={testId} className="bg-white p-4 rounded shadow">
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
            <EditProductForm
              product={editingProduct}
              onProductUpdate={(updatedProduct) =>
                handleEditComplete(updatedProduct)
              }
            />
          ) : (
            <div>
              {product.discounts.map((discount, index) => {
                const { quantity, rate } = discount;

                return (
                  <div key={index} className="mb-2">
                    {quantity}개 이상 구매 시 {(rate * 100).toFixed(0)}% 할인
                  </div>
                );
              })}
              <button
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
  );
}
