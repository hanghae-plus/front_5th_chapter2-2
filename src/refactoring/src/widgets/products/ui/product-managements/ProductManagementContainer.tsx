import { useState } from "react";
import { Product } from "../../../../entities/product/types";
import { DiscountView } from "../../../../entities/product/ui";
import { useProducts } from "../../../../features/products/hooks";
import {
  CreateProductForm,
  UpdateProductForm,
} from "../../../../features/products/ui";
import { ContentBox } from "../../../../shared/ui";

export const ProductManagementContainer = () => {
  const { products, updateProduct } = useProducts();
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
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
    setEditingProduct({ ...product });
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  return (
    <ContentBox title="상품 관리">
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <CreateProductForm setShowNewProductForm={setShowNewProductForm} />
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
                {editingProduct && editingProduct.id === product.id ? (
                  <UpdateProductForm
                    editingProduct={editingProduct}
                    setEditingProduct={setEditingProduct}
                    handleEditComplete={handleEditComplete}
                  />
                ) : (
                  <div>
                    {product.discounts.map((discount, index) => (
                      <DiscountView key={index} discount={discount} />
                    ))}
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
        ))}
      </div>
    </ContentBox>
  );
};
