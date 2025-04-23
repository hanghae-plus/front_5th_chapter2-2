import { useState } from "react";
import { Discount, Product } from "../../../types";

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}

const ProductList = ({ products, onProductUpdate }: Props) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  /** 각 상품의 정보와 수정을 위한 아코디언 토글 */
  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  /** 상품의 이름을 업데이트합니다.*/
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  /** 상품의 가격을 업데이트합니다. */
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  /**상품의 재고를 업데이트합니다. */
  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  /** productId의 index에 해당하는 할인을 삭제합니다. */
  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  /** 할인을 추가합니다. */
  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  /** 상품의 수정을 완료합니다. */
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  /** 편집하는 상품을 수정합니다.*/
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <div
          key={product.id}
          data-testid={`product-${index + 1}`}
          className="bg-white p-4 rounded shadow"
        >
          <button
            data-testid="toggle-button"
            onClick={() => toggleProductAccordion(product.id)}
            className="w-full text-left font-semibold"
          >
            {product.name} - {product.price}원 (재고: {product.stock})
          </button>
          {openProductIds.has(product.id) && (
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
                          {discount.quantity}개 이상 구매 시{" "}
                          {discount.rate * 100}% 할인
                        </span>
                        <button
                          onClick={() =>
                            handleRemoveDiscount(product.id, index)
                          }
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
                      <button
                        onClick={() => handleAddDiscount(product.id)}
                        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                      >
                        할인 추가
                      </button>
                    </div>
                  </div>
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
                        {discount.quantity}개 이상 구매 시 {discount.rate * 100}
                        % 할인
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
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
