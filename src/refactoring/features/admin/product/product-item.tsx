import { Product } from "../../../entities";
import { useToggle } from "../../../hooks";
import { useEditProductAction } from "../../../hooks/product/useEditProductAction";
import { useProductStore } from "../../../store/product-store";
import { Button } from "../../../ui/button";
import { ProductEditForm } from "./product-edit-form";

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
        {product.name} - {product.price}원 (재고: {product.stock})
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
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
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
