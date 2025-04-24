import { Product } from "../../../entities";
import { DiscountInputForm } from "../../../entities/discount/discount-input-form";
import { useDiscount } from "../../../hooks";
import { Button } from "../../../ui/button";
import { rateToPercent } from "../../../utils/percentUtils";

interface Props {
  editingProduct: Product;
  product: Product;
}

export const DiscountEditForm = (props: Props) => {
  const { editingProduct, product } = props;

  const { handleRemoveDiscount, updateNewDiscount, handleAddDiscount, newDiscount } = useDiscount();

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      {editingProduct.discounts.map((discount, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {rateToPercent(discount.rate)}% 할인
          </span>
          <Button
            onClick={() => handleRemoveDiscount(product.id, index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            삭제
          </Button>
        </div>
      ))}
      <DiscountInputForm
        discount={newDiscount}
        onChange={updateNewDiscount}
        onSubmit={() => handleAddDiscount(product.id)}
      />
    </div>
  );
};
