import { Product } from "@r/model/product/types";

interface Props {
  product: Product;
}

export const ApplicableCouponList: React.FC<Props> = ({ product }) => {
  return (
    product.discounts.length > 0 && (
      <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
        {product.discounts.map((discount, index) => (
          <li key={index}>
            {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}% 할인
          </li>
        ))}
      </ul>
    )
  );
};
