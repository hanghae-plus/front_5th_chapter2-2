import { Product } from "@r/model/product/types";
import { ViewToggle } from "@r/shared/ui/view-toggle";

interface Props {
  product: Product;
}

export const DiscountAndTrigger: React.FC<Props> = ({ product }) => {
  return (
    <div>
      {product.discounts.map((discount, index) => (
        <div key={index} className="mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
        </div>
      ))}
      <ViewToggle.Trigger
        data-testid="modify-button"
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
      >
        수정
      </ViewToggle.Trigger>
    </div>
  );
};
