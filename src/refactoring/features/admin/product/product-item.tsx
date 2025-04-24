import { Product } from "@refactoring/entities";
import { useEditProductAction, useToggle } from "@refactoring/hooks";
import { ProductEditForm } from "./product-edit-form";

import { useProductStore } from "@refactoring/store/product-store";
import { Button } from "@refactoring/ui";
import { formatCurrency, rateToPercent } from "@refactoring/utils";

interface Props {
  product: Product;
  index: number;
}

export const ProductItem = (props: Props) => {
  const { product, index } = props;

  const { openToggle, handleToggleClick: toggleProductAccordion } = useToggle<string>();
  const { editingProduct } = useProductStore();
  const { handleEditProduct } = useEditProductAction();

  const isOpen = openToggle.has(product.id);
  const isEditing = editingProduct?.id === product.id;

  return (
    <div
      key={product.id}
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <Button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {formatCurrency(product.price)} (재고: {product.stock})
      </Button>
      {isOpen && (
        <div className="mt-2">
          {isEditing ? (
            <ProductEditForm editingProduct={editingProduct} product={product} />
          ) : (
            <div>
              {product.discounts.map((discount, index) => (
                <div key={index} className="mb-2">
                  <span>
                    {discount.quantity}개 이상 구매 시 {rateToPercent(discount.rate)}% 할인
                  </span>
                </div>
              ))}
              <Button
                data-testid="modify-button"
                onClick={() => handleEditProduct(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                수정
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
