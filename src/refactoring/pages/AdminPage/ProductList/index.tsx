import { useProductContext } from "@/refactoring/provider";
import { Product } from "@/types";
import { useState } from "react";
import { AddDiscount } from "./AddDiscount";
import { DiscountList } from "./DiscountList";
import { ModifyProduct } from "./ModifyProduct";

export const ProductList = () => {
  const { products, updateProduct: onProductUpdate } = useProductContext();

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

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <div key={product.id} data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
          <button data-testid="toggle-button" onClick={() => toggleProductAccordion(product.id)} className="w-full text-left font-semibold">
            {product.name} - {product.price}원 (재고: {product.stock})
          </button>
          {openProductIds.has(product.id) && (
            <div className="mt-2">
              {editingProduct && editingProduct.id === product.id ? (
                <div>
                  <ModifyProduct product={product} editingProduct={editingProduct} setEditingProduct={setEditingProduct} />
                  {/* 할인 정보 수정 부분 */}
                  <AddDiscount product={product} editingProduct={editingProduct} setEditingProduct={setEditingProduct} />
                  <button onClick={handleEditComplete} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2">
                    수정 완료
                  </button>
                </div>
              ) : (
                <DiscountList product={product} setEditingProduct={setEditingProduct} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
