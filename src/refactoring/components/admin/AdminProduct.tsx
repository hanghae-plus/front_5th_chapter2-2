import {  Product } from "../../../types"
import { useAdminProduct } from "../../hooks";

interface Props {
  product: Product;
  index: number;
  onProductUpdate: (updatedProduct: Product) => void;
}

const ToggleAccordionButton = ({onClick, name, price, stock}: {onClick: () => void, name: string, price: number, stock: number}) => {
  return (
    <button
      data-testid="toggle-button"
      onClick={onClick}
      className="w-full text-left font-semibold"
    >
      {name} - {price}원 (재고: {stock})
    </button>
  )
}

export const AdminProduct = ({
  product,
  index,
  onProductUpdate,
}: Props) => {
  const {
    isOpenProductAccordion,
    editingProduct,
    newDiscount,
    setNewDiscount,
    handleToggleAccordion,
    handleInitiateProductEdit,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleRemoveDiscount,
    handleAddDiscount,
    handleCompleteProductEdit,
  } = useAdminProduct({ onProductUpdate });

  const isInEditMode = !!editingProduct;
  
  return (
    <div data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
      <ToggleAccordionButton
        onClick={handleToggleAccordion}
        name={product.name}
        price={product.price}
        stock={product.stock}
      />

      {isOpenProductAccordion && (
        <div className="mt-2">
          {isInEditMode ? (
            <div>
              <div className="mb-4">
                <label className="block mb-1">상품명: </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => handleProductNameUpdate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">가격: </label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => handlePriceUpdate(parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">재고: </label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => handleStockUpdate(parseInt(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* 할인 정보 수정 부분 */}
              <div>
                <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                {editingProduct.discounts.map((discount, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span>{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인</span>
                    <button
                      onClick={() => handleRemoveDiscount(index)}
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
                    onClick={handleAddDiscount}
                    className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    할인 추가
                  </button>
                </div>
              </div>
              <button
                onClick={handleCompleteProductEdit}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
              >
                수정 완료
              </button>
            </div>
          ) : (
            <div>
              {product.discounts.map((discount, index) => (
                <div key={index} className="mb-2">
                  <span>{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인</span>
                </div>
              ))}
              <button
                data-testid="modify-button"
                onClick={() => handleInitiateProductEdit(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                수정
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
