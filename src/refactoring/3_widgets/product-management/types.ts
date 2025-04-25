import { Product, Discount, ProductFormData } from "../../6_shared/types";

export interface ProductAccordionItemProps {
  product: Product;
  index: number;
  updateProduct: (updatedProduct: Product) => void;
}

export interface ProductEditFormProps {
  product: Product;
  onFieldChange: (field: keyof Product, value: string | number) => void;
  addDiscount: (discount: Discount) => void;
  removeDiscount: (index: number) => void;
  onSaveClick: () => void;
}

export interface DiscountListProps {
  discounts: Discount[];
}

export interface DiscountEditorProps {
  discounts: Discount[];
  addDiscount: (discount: Discount) => void;
  removeDiscount: (index: number) => void;
}

export interface NewProductFormProps {
  onSubmit: (product: ProductFormData) => void;
}

export interface ProductManagementPanelProps {
  title?: string;
}
