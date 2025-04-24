import { useState } from "react";

import { Input } from "../../../components/Input";

import { useForm } from "../../../hooks";

import { Product, Discount } from "../../../../types";

interface ProductEditorTypeProps {
  product: Product;
  isOpen: boolean;
  index: number;
  onToggle: () => void;
  onUpdate: (updatedProduct: Product) => void;
}

export const ProductEditor = ({
  product,
  isOpen,
  index,
  onToggle,
  onUpdate,
}: ProductEditorTypeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const { values: editProduct, handleChange } = useForm<Product>({
    ...product,
  });

  const handleAddDiscount = () => {
    handleChange("discounts", [...editProduct.discounts, newDiscount]);
    setNewDiscount({ quantity: 0, rate: 0 });
  };

  const handleRemoveDiscount = (index: number) => {
    const updatedDiscounts = editProduct.discounts.filter(
      (_, i) => i !== index,
    );
    handleChange("discounts", updatedDiscounts);
  };

  const handleEditComplete = () => {
    onUpdate(editProduct);
    setIsEditing(false);
  };

  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <button
        data-testid="toggle-button"
        onClick={onToggle}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {isOpen && (
        <div className="mt-2">
          {isEditing ? (
            <div>
              <Input id="edit-product-name">
                <Input.Label>상품명 :</Input.Label>
                <Input.Field
                  type="text"
                  value={editProduct.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </Input>
              <Input id="edit-product-price">
                <Input.Label>가격: </Input.Label>
                <Input.Field
                  type="number"
                  value={editProduct.price}
                  onChange={(e) =>
                    handleChange("price", parseInt(e.target.value))
                  }
                />
              </Input>
              <Input id="edit-product-stock">
                <Input.Label>재고: </Input.Label>
                <Input.Field
                  type="number"
                  value={editProduct.stock}
                  onChange={(e) =>
                    handleChange("stock", parseInt(e.target.value))
                  }
                />
              </Input>
              <div>
                <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                {editProduct.discounts.map((discount, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>
                      {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                      할인
                    </span>
                    <button
                      onClick={() => handleRemoveDiscount(idx)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <Input id="edit-product-quantity">
                    <Input.Field
                      type="number"
                      placeholder="수량"
                      value={newDiscount.quantity || ""}
                      onChange={(e) =>
                        setNewDiscount({
                          ...newDiscount,
                          quantity: parseInt(e.target.value),
                        })
                      }
                    />
                  </Input>
                  <Input id="edit-product-rate">
                    <Input.Field
                      type="number"
                      placeholder="할인율 (%)"
                      value={newDiscount.rate * 100 || ""}
                      onChange={(e) =>
                        setNewDiscount({
                          ...newDiscount,
                          rate: parseInt(e.target.value) / 100,
                        })
                      }
                    />
                  </Input>
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
                onClick={() => setIsEditing(true)}
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
