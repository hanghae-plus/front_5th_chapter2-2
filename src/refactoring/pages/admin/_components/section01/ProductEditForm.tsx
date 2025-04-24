import { useState } from "react";
import type { IDiscount, IProduct } from "#src/types";
import { useProducts } from "#src/refactoring/hooks";

interface IProps {
  product: IProduct;
  editingProduct: IProduct;
  setEditingProduct: (product: IProduct | null) => void;
}

const ProductEditForm: React.FC<IProps> = ({ product, editingProduct, setEditingProduct }) => {
  const { products, updateProduct } = useProducts();

  const [newDiscount, setNewDiscount] = useState<IDiscount>({ quantity: 0, rate: 0 });

  /** 상품명 수정 */
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (!editingProduct) return;
    if (editingProduct.id !== productId) return;

    const updatedProduct = { ...editingProduct, name: newName };
    setEditingProduct(updatedProduct);
  };
  /** 가격 수정 */
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (!editingProduct) return;
    if (editingProduct.id !== productId) return;

    const updatedProduct = { ...editingProduct, price: newPrice };
    setEditingProduct(updatedProduct);
  };
  /** 재고 수정 */
  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (!updatedProduct) return;

    const newProduct = { ...updatedProduct, stock: newStock };
    updateProduct(newProduct);
    setEditingProduct(newProduct);
  };
  /** 할인 추가 */
  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (!updatedProduct) return;

    const newProduct = {
      ...updatedProduct,
      discounts: [...updatedProduct.discounts, newDiscount],
    };
    updateProduct(newProduct);
    setEditingProduct(newProduct);
    setNewDiscount({ quantity: 0, rate: 0 });
  };
  /** 할인 삭제 */
  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (!updatedProduct) return;

    const newProduct = {
      ...updatedProduct,
      discounts: updatedProduct.discounts.filter((_, i) => i !== index),
    };
    updateProduct(newProduct);
    setEditingProduct(newProduct);
  };

  // 수정 완료 핸들러 함수 추가
  const handleEditSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          value={editingProduct.name}
          onChange={(e) => handleProductNameUpdate(product.id, e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={editingProduct.price}
          onChange={(e) => handlePriceUpdate(product.id, parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          value={editingProduct.stock}
          onChange={(e) => handleStockUpdate(product.id, parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* 할인 정보 수정 부분 */}
      <div>
        <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
        {editingProduct.discounts.map((discount, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>
              {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
            </span>
            <button
              type="button"
              onClick={() => handleRemoveDiscount(product.id, index)}
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
            onChange={(e) => setNewDiscount({ ...newDiscount, quantity: parseInt(e.target.value) })}
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="할인율 (%)"
            value={newDiscount.rate * 100}
            onChange={(e) => setNewDiscount({ ...newDiscount, rate: parseInt(e.target.value) / 100 })}
            className="w-1/3 p-2 border rounded"
          />
          <button
            type="button"
            onClick={() => handleAddDiscount(product.id)}
            className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            할인 추가
          </button>
        </div>
      </div>
      <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2">
        수정 완료
      </button>
    </form>
  );
};

export default ProductEditForm;
