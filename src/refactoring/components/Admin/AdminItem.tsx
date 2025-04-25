import { Product, Discount } from "../../../types";
import { Button } from "../Common/Button";

interface Props {
  product: Product;
  index: number;
  isOpen: boolean;
  editingProduct: Product | null;
  newDiscount: Discount;
  toggleProductAccordion: (id: string) => void;
  handleEditProduct: (product: Product) => void;
  handleEditComplete: () => void;
  handleProductNameUpdate: (id: string, name: string) => void;
  handlePriceUpdate: (id: string, price: number) => void;
  handleStockUpdate: (id: string, stock: number) => void;
  handleRemoveDiscount: (id: string, index: number) => void;
  handleAddDiscount: (id: string) => void;
  setNewDiscount: (discount: Discount) => void;
}

export const AdminItem = ({
  product,
  index,
  isOpen,
  editingProduct,
  newDiscount,
  toggleProductAccordion,
  handleEditProduct,
  handleEditComplete,
  handleProductNameUpdate,
  handlePriceUpdate,
  handleStockUpdate,
  handleRemoveDiscount,
  handleAddDiscount,
  setNewDiscount,
}: Props) => {
  return (
    <div
      key={product.id}
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <Button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(product.id)}
        variant="textOnly"
        fullWidth
        className="text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </Button>
      {isOpen && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === product.id ? (
            <div>
              <div className="mb-4">
                <label className="block mb-1">상품명: </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    handleProductNameUpdate(product.id, e.target.value)
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
                    handlePriceUpdate(product.id, parseInt(e.target.value))
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
                    handleStockUpdate(product.id, parseInt(e.target.value))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* 할인 정보 수정 부분 */}
              <div>
                <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                {editingProduct.discounts.map((discount, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>
                      {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                      할인
                    </span>
                    <Button
                      onClick={() => handleRemoveDiscount(product.id, index)}
                      variant="danger"
                      className="px-2 py-1"
                    >
                      삭제
                    </Button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="수량"
                    value={newDiscount.quantity}
                    onChange={(e) =>
                      setNewDiscount({
                        ...newDiscount,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="할인율 (%)"
                    value={newDiscount.rate * 100}
                    onChange={(e) =>
                      setNewDiscount({
                        ...newDiscount,
                        rate: parseInt(e.target.value) / 100,
                      })
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <Button
                    onClick={() => handleAddDiscount(product.id)}
                    variant="primary"
                    className="w-1/3 p-2"
                  >
                    할인 추가
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleEditComplete}
                variant="success"
                className="px-2 py-1 mt-2"
              >
                수정 완료
              </Button>
            </div>
          ) : (
            <div>
              {product.discounts.map((discount, index) => (
                <div key={index} className="mb-2">
                  <span>
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                    할인
                  </span>
                </div>
              ))}
              <Button
                data-testid="modify-button"
                onClick={() => handleEditProduct(product)}
                variant="primary"
                className="px-2 py-1 mt-2"
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
