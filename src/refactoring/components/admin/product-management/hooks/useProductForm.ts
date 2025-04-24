import { Product } from "../../../../../types.ts";
import { useForm } from "../../../../hooks";

export type ProductValue = Partial<Pick<Product, "id">> & Omit<Product, "id">;

const EMPTY_PRODUCT_VALUE = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
} as const satisfies ProductValue;

export const useProductForm = (
  initialValue: ProductValue = EMPTY_PRODUCT_VALUE,
) => {
  const {
    values: productValue,
    handleChange,
    reset,
  } = useForm<ProductValue>(initialValue);

  const updateProductName = handleChange("name");
  const updateProductPrice = handleChange("price");
  const updateProductStock = handleChange("stock");

  const resetProduct = () => reset(EMPTY_PRODUCT_VALUE);

  return {
    productValue,
    updateProductName,
    updateProductPrice,
    updateProductStock,
    resetProduct,
  };
};
