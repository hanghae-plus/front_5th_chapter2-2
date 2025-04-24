import { Product } from "@/types";

interface ValidationError {
  field: string;
  message: string;
}

export const validateProductData = (product: Product): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!product.name.trim()) {
    errors.push({
      field: 'name',
      message: '상품명은 필수입니다.',
    });
  }

  if (product.price <= 0) {
    errors.push({
      field: 'price',
      message: '가격은 0보다 커야 합니다.',
    });
  }

  if (product.stock <= 0) {
    errors.push({
      field: 'stock',
      message: '재고는 0 보다 커야 합니다.',
    });
  }

  if (product.discounts.length > 0) {
    product.discounts.forEach((discount, index) => {
      if (discount.quantity <= 0) {
        errors.push({
          field: `discounts[${index}].quantity`,
          message: '할인 수량은 0보다 커야 합니다.',
        });
      }
      if (discount.rate <= 0 || discount.rate >= 1) {
        errors.push({
          field: `discounts[${index}].rate`,
          message: '할인율은 0과 1 사이여야 합니다.',
        });
      }
    });
  }

  return errors;
};
