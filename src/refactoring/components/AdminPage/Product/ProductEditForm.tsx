import { Discount, Product } from '../../../../types';
import { DiscountManager } from '../DiscountManager';

interface ProductEditFormProps {
  product: Product;
  editingProduct: Product;
  newDiscount: Discount;
  updateProductName: (productId: string, name: string) => void;
  updateProductPrice: (productId: string, price: number) => void;
  updateProductStock: (productId: string, stock: number) => void;
  editComplete: () => void;
  addDiscount: (productId: string) => void;
  removeDiscount: (productId: string, index: number) => void;
  updateDiscount: (params: { e: React.ChangeEvent<HTMLInputElement>; isRate: boolean }) => void;
}

const ProductEditForm = ({
  product,
  editingProduct,
  updateProductName,
  updateProductPrice,
  updateProductStock,
  editComplete,
  newDiscount,
  addDiscount,
  removeDiscount,
  updateDiscount,
}: ProductEditFormProps) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          value={editingProduct.name}
          onChange={(e) => updateProductName(product.id, e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={editingProduct.price}
          onChange={(e) => updateProductPrice(product.id, parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          value={editingProduct.stock}
          onChange={(e) => updateProductStock(product.id, parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      <DiscountManager
        discounts={editingProduct.discounts}
        newDiscount={newDiscount}
        onRemove={(index) => removeDiscount(product.id, index)}
        onAdd={() => addDiscount(product.id)}
        onUpdateDiscount={updateDiscount}
      />

      <button
        onClick={editComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
};

export default ProductEditForm;
