import { Button } from "../../ui/Button.tsx";
import { Product } from "../../../../types.ts";
import { useState } from "react";
import { ProductAddForm } from "./ProductAddForm.tsx";
import { ProductEditForm } from "./ProductEditForm.tsx";

type Props = {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
};

export const ProductManagement = ({
  products,
  onProductUpdate,
  onProductAdd,
}: Props) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [showNewProductForm, setShowNewProductForm] = useState(false);

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

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
  };

  const handleSaveEdit = (updatedProduct: Product) => {
    onProductUpdate(updatedProduct);
    setEditingProductId(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <Button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        variant="success"
        className="mb-4"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </Button>
      {showNewProductForm && (
        <ProductAddForm
          onProductAdd={onProductAdd}
          onCancel={() => setShowNewProductForm(false)}
        />
      )}
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
                {editingProductId === product.id ? (
                  <ProductEditForm
                    initialProduct={product}
                    onEditComplete={handleSaveEdit}
                  />
                ) : (
                  <div>
                    {product.discounts.map((discount, index) => (
                      <div key={index} className="mb-2">
                        <span>
                          {discount.quantity}개 이상 구매 시{" "}
                          {discount.rate * 100}% 할인
                        </span>
                      </div>
                    ))}
                    <Button
                      data-testid="modify-button"
                      onClick={() => handleEditProduct(product)}
                      variant="primary"
                      size="sm"
                      className="mt-2"
                    >
                      수정
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
