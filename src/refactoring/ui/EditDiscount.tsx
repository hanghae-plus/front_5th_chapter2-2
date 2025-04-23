import { AddDiscount } from './AddDiscount.tsx';
import { Product } from '../../types.ts';
import { removeDiscountFromProduct } from '../models/product.ts';

interface Props {
  newProduct: Product;
  setEditingProduct: (
    value: ((prevState: Product) => Product) | Product,
  ) => void;
  onProductUpdate: (updatedProduct: Product) => void;
}

export const EditDiscount = ({
  editingProduct,
  setEditingProduct,
  onProductUpdate,
}: Props) => {
  const handleRemoveDiscount = (index: number) => {
    const updatedProduct = removeDiscountFromProduct(editingProduct, index);
    onProductUpdate(updatedProduct);
    setEditingProduct(updatedProduct);
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      {editingProduct.discounts.map((discount, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
          <button
            onClick={() => handleRemoveDiscount(index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      ))}

      <AddDiscount
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        onProductUpdate={onProductUpdate}
      ></AddDiscount>
    </div>
  );
};
