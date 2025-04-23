import { useSetAtom } from "jotai";
import { Product } from "../../../types.ts";
import { formatDiscountInfo } from "../../models/product.ts";
import { handleEditProductAtom } from "../../store/products/actions.ts";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const handleEditProduct = useSetAtom(handleEditProductAtom);

  return (
    <div>
      {product.discounts.length > 0 ? (
        product.discounts.map((discount, index) => (
          <div key={index} className="mb-2">
            <span>{formatDiscountInfo(discount)}</span>
          </div>
        ))
      ) : (
        <div className="mb-2 text-gray-500">할인 정보 없음</div>
      )}
      <button
        data-testid="modify-button"
        onClick={() => handleEditProduct(product)}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
      >
        수정
      </button>
    </div>
  );
};
