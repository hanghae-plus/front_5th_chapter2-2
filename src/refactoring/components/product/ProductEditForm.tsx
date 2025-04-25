import { Discount, Product } from "../../../types";
import { ProductDiscountManage } from "./ProductDiscountManage";

interface ProductEditFormProps {
  newDiscount: Discount;
  setNewDiscount: (discount: Discount) => void;
  handleAddDiscount: (productId: string) => void;
  editingProduct: Product;
  handleProductNameUpdate: (productId: string, newName: string) => void;
  handlePriceUpdate: (productId: string, newPrice: number) => void;
  handleStockUpdate: (productId: string, newStock: number) => void;
  handleRemoveDiscount: (productId: string, index: number) => void;
  handleEditComplete: (product: Product) => void;
}
export const ProductEditForm = ({
  newDiscount,
  setNewDiscount,
  handleAddDiscount,
  editingProduct,
  handleProductNameUpdate,
  handlePriceUpdate,
  handleStockUpdate,
  handleRemoveDiscount,
  handleEditComplete,
}: ProductEditFormProps) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          value={editingProduct.name}
          onChange={(e) =>
            handleProductNameUpdate(editingProduct.id, e.target.value)
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={editingProduct.price}
          onChange={(e) =>
            handlePriceUpdate(editingProduct.id, parseInt(e.target.value))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          value={editingProduct.stock}
          onChange={(e) =>
            handleStockUpdate(editingProduct.id, parseInt(e.target.value))
          }
          className="w-full p-2 border rounded"
        />
      </div>
      {/* 할인 정보 수정 부분 */}
      <div> 
        <ProductDiscountManage
          editingProduct={editingProduct}
          handleRemoveDiscount={handleRemoveDiscount}
          newDiscount={newDiscount}
          setNewDiscount={setNewDiscount}
          handleAddDiscount={handleAddDiscount}
        />
        <button
          onClick={() => handleEditComplete(editingProduct)}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
        >
          수정 완료
        </button>
      </div>
    </div>
  );
};
