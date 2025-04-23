import { useState } from "react";

import { Product, Discount, useProductContext } from "@r/entities/product";

interface ProductAccordionProps extends React.HTMLProps<HTMLDivElement> {
  product: Product;
}

export const ProductAccordion: React.FC<ProductAccordionProps> = ({
  product,
  ...props
}) => {
  const { updateProduct } = useProductContext();

  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const toggleProductAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  // 수정하기 버튼 클릭시. 폼을 열고, 수정할 상품으로 초기화
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // 수정하기 - 상품명 변경시 폼 업데잍트
  const handleProductNameUpdate = (newName: string) => {
    if (editingProduct) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  // 수정하기 - 가격 변경시 폼 업데이트
  const handlePriceUpdate = (newPrice: number) => {
    if (editingProduct) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  // 수정하기 - 재고 변경시 폼 업데이트
  const handleStockUpdate = (newStock: number) => {
    if (editingProduct) {
      const newProduct = { ...editingProduct, stock: newStock };
      setEditingProduct(newProduct);
    }
  };

  // 수정완료 버튼 클릭시 폼을 닫고, 상품 업데이트
  const handleEditComplete = () => {
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleAddDiscount = () => {
    if (editingProduct) {
      const newProduct = {
        ...product,
        discounts: [...product.discounts, newDiscount],
      };
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (index: number) => {
    const newProduct = {
      ...product,
      discounts: product.discounts.filter((_, i) => i !== index),
    };
    updateProduct(newProduct);
    setEditingProduct(newProduct);
  };

  return (
    <div className="bg-white p-4 rounded shadow" {...props}>
      <button
        data-testid="toggle-button"
        onClick={toggleProductAccordion}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {isOpen && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === product.id ? (
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
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>
                      {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                      할인
                    </span>
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
                    onClick={handleAddDiscount}
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
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                    할인
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
  );
};
