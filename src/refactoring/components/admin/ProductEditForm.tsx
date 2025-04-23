import { Product, Discount } from '../../../types';

interface ProductEditFormProps {
  editingProduct: Product;
  newDiscount: Discount;
  onProductUpdate: (productId: string, field: string, value: string | number) => void;
  onDiscountAdd: (productId: string) => void;
  onDiscountRemove: (productId: string, index: number) => void;
  onNewDiscountChange: (discount: Discount) => void;
  onEditComplete: () => void;
}

export const ProductEditForm = ({
  editingProduct,
  newDiscount,
  onProductUpdate,
  onDiscountAdd,
  onDiscountRemove,
  onNewDiscountChange,
  onEditComplete
}: ProductEditFormProps) => (
  <div>
    <ProductFields
      editingProduct={editingProduct}
      onProductUpdate={onProductUpdate}
    />
    <DiscountSection
      editingProduct={editingProduct}
      newDiscount={newDiscount}
      onDiscountAdd={onDiscountAdd}
      onDiscountRemove={onDiscountRemove}
      onNewDiscountChange={onNewDiscountChange}
    />
    <button
      onClick={onEditComplete}
      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
    >
      수정 완료
    </button>
  </div>
);

interface ProductFieldsProps {
  editingProduct: Product;
  onProductUpdate: (productId: string, field: string, value: string | number) => void;
}

const ProductFields = ({ editingProduct, onProductUpdate }: ProductFieldsProps) => (
  <>
    <div className="mb-4">
      <label className="block mb-1">상품명: </label>
      <input
        type="text"
        value={editingProduct.name}
        onChange={(e) => onProductUpdate(editingProduct.id, 'name', e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">가격: </label>
      <input
        type="number"
        value={editingProduct.price}
        onChange={(e) => onProductUpdate(editingProduct.id, 'price', parseInt(e.target.value))}
        className="w-full p-2 border rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">재고: </label>
      <input
        type="number"
        value={editingProduct.stock}
        onChange={(e) => onProductUpdate(editingProduct.id, 'stock', parseInt(e.target.value))}
        className="w-full p-2 border rounded"
      />
    </div>
  </>
);

interface DiscountSectionProps {
  editingProduct: Product;
  newDiscount: Discount;
  onDiscountAdd: (productId: string) => void;
  onDiscountRemove: (productId: string, index: number) => void;
  onNewDiscountChange: (discount: Discount) => void;
}

const DiscountSection = ({
  editingProduct,
  newDiscount,
  onDiscountAdd,
  onDiscountRemove,
  onNewDiscountChange
}: DiscountSectionProps) => (
  <div>
    <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
    {editingProduct.discounts.map((discount, index) => (
      <div key={index} className="flex justify-between items-center mb-2">
        <span>{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인</span>
        <button
          onClick={() => onDiscountRemove(editingProduct.id, index)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    ))}
    <div className="flex space-x-2">
      <input
        type="number"
        placeholder="수량"
        value={newDiscount.quantity}
        onChange={(e) => onNewDiscountChange({ ...newDiscount, quantity: parseInt(e.target.value) })}
        className="w-1/3 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="할인율 (%)"
        value={newDiscount.rate * 100}
        onChange={(e) => onNewDiscountChange({ ...newDiscount, rate: parseInt(e.target.value) / 100 })}
        className="w-1/3 p-2 border rounded"
      />
      <button
        onClick={() => onDiscountAdd(editingProduct.id)}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        할인 추가
      </button>
    </div>
  </div>
); 