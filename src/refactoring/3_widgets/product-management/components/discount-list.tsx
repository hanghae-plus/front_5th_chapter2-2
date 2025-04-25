import { DiscountListProps } from "../../product-list";

export const DiscountList: React.FC<DiscountListProps> = ({ discounts }) => {
  return (
    <div>
      {discounts.map((discount, index) => (
        <div key={index} className="mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
        </div>
      ))}
    </div>
  );
};
