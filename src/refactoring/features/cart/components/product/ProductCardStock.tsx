export const ProductCardStock = ({
  remainingStock,
  isOutOfStock
}: {
  remainingStock: number;
  isOutOfStock: boolean;
}) => (
  <span
    className={`font-medium ${
      isOutOfStock ? "text-red-600" : "text-green-600"
    }`}
  >
    재고: {remainingStock}개
  </span>
);
