import { Product } from "../../types";

export const validateProductFields = (product: Product | null): boolean => {
  if (!product) {
    return false;
  }

  const { name, price, stock, discounts } = product;

  const isInvalid =
    !name ||
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof price !== "number" ||
    isNaN(price) ||
    price <= 0 ||
    typeof stock !== "number" ||
    isNaN(stock) ||
    stock < 0 ||
    !Array.isArray(discounts) ||
    discounts.length === 0 ||
    discounts.some(
      (d) =>
        typeof d.quantity !== "number" ||
        d.quantity <= 0 ||
        typeof d.rate !== "number" ||
        d.rate <= 0
    );

  if (isInvalid) {
    return false;
  }

  return true;
};
