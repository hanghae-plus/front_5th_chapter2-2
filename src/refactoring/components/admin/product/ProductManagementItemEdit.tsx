import { Discount, Product } from "../../../../types";
import { Button, Text } from "../../common";
import { ProductManagementItemEditInput } from "./ProductManagementItemEditInput";
interface ProductManagementItemEditProps {
  editingProduct: Product | null;
  handleFieldUpdate: <K extends keyof Product>(
    productId: string,
    field: K,
    value: Product[K]
  ) => void;
  handleDiscountRemove: (productId: string, index: number) => void;
  handleDiscountAdd: (productId: string) => void;
  newDiscount: Discount;
  setNewDiscount: (discount: Discount) => void;
  product: Product;
  handleEditComplete: () => void;
}

export const ProductManagementItemEdit = ({
  editingProduct,
  handleFieldUpdate,
  product,
  handleDiscountRemove,
  handleDiscountAdd,
  newDiscount,
  setNewDiscount,
  handleEditComplete,
}: ProductManagementItemEditProps) => {
  if (!editingProduct) return null;

  return (
    <div>
      <ProductManagementItemEditInput
        editingProduct={editingProduct}
        handleFieldUpdate={handleFieldUpdate}
        productId={product.id}
        field="name"
        label="상품명"
        type="text"
      />
      <ProductManagementItemEditInput
        editingProduct={editingProduct}
        handleFieldUpdate={handleFieldUpdate}
        productId={product.id}
        field="price"
        label="가격"
        type="number"
      />
      <ProductManagementItemEditInput
        editingProduct={editingProduct}
        handleFieldUpdate={handleFieldUpdate}
        productId={product.id}
        field="stock"
        label="재고"
        type="number"
      />
      {/* 할인 정보 수정 부분 */}
      <div>
        <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
        {editingProduct.discounts.map((discount, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <Text>
              {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
            </Text>
            <Button
              color="red"
              className="px-2 py-1"
              onClick={() => handleDiscountRemove(product.id, index)}
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
            color="blue"
            width="third"
            className="p-2"
            onClick={() => handleDiscountAdd(product.id)}
          >
            할인 추가
          </Button>
        </div>
      </div>
      <Button
        color="green"
        className="px-2 py-1 mt-2"
        onClick={handleEditComplete}
      >
        수정 완료
      </Button>
    </div>
  );
};
