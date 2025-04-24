import { Product } from "@/types";

type Props = {
  product: Product;
};

const CartDiscountList = ({ product }: Props) => {
  if (!product.discounts.length) return null;
  return (
    <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
      {product.discounts.map((discount, index) => (
        <li key={index}>
          {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}% 할인
        </li>
      ))}
    </ul>
  );
};

export default CartDiscountList;
