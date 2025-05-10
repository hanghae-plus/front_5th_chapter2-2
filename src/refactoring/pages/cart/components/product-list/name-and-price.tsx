import { Product } from "@r/model/product/types";

interface Props {
  product: Product;
}

export const NameAndPrice: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">{product.name}</span>
      <span className="text-gray-600">{product.price.toLocaleString()}원</span>
    </div>
  );
};
