import { Product } from "../../types";

interface ItemNamePriceProps {
  product: Product;
}

// 상품명, 가격
export const ItemNamePrice = ({ product }: ItemNamePriceProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">{product.name}</span>
      <span className="text-gray-600">{product.price.toLocaleString()}원</span>
    </div>
  );
};
