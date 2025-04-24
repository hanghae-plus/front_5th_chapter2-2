import { Product, Discount } from "../../../../types.ts";
import DiscountManager from "./DiscountManager";

interface ModifyProductProps {
  product: Product;
  editingProduct: Product | null;
  handleEditProduct: (product: Product) => void;
  handleProductFieldUpdate: (
    productId: string,
    field: keyof Product,
    value: string | number
  ) => void;
  handleEditComplete: () => void;
  newDiscount: Discount;
  handleRemoveDiscount: (product: Product, index: number) => Product;
  handleDiscountChange: (field: "quantity" | "rate", value: number) => void;
  handleAddDiscount: (product: Product) => Product;
  setEditingProduct: (product: Product) => void;
}

const ModifyProduct = ({
  product,
  editingProduct,
  handleEditProduct,
  handleProductFieldUpdate,
  handleEditComplete,
  newDiscount,
  handleRemoveDiscount,
  handleDiscountChange,
  handleAddDiscount,
  setEditingProduct,
}: ModifyProductProps) => {
  return (
    <div className="mt-2">
      {editingProduct && editingProduct.id === product.id ? (
        <div>
          {/* 상품 수정 폼 */}
          <div className="mb-4">
            <label className="block mb-1">상품명: </label>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                handleProductFieldUpdate(product.id, "name", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                handleProductFieldUpdate(
                  product.id,
                  "price",
                  parseInt(e.target.value)
                )
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              value={editingProduct.stock}
              onChange={(e) =>
                handleProductFieldUpdate(
                  product.id,
                  "stock",
                  parseInt(e.target.value)
                )
              }
              className="w-full p-2 border rounded"
            />
          </div>
          {/* 할인 정보 수정 */}
          <DiscountManager
            editingProduct={editingProduct}
            newDiscount={newDiscount}
            handleRemoveDiscount={handleRemoveDiscount}
            handleDiscountChange={handleDiscountChange}
            handleAddDiscount={handleAddDiscount}
            setEditingProduct={setEditingProduct}
          />
          <button
            onClick={handleEditComplete}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
          >
            수정 완료
          </button>
        </div>
      ) : (
        <div>
          {product.discounts.map((discount, index) => (
            <div key={index} className="mb-2">
              <span>
                {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
              </span>
            </div>
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
  );
};

export default ModifyProduct;
