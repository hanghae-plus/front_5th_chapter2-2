import React from "react";

import { ViewToggle } from "@r/shared/ui/view-toggle";
import { NewProductForm } from "./new-product-form";

interface AddNewProductProps {}

export const AddNewProduct: React.FC<AddNewProductProps> = () => {
  return (
    <ViewToggle>
      <ViewToggle.Trigger className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
        {(isShow) => (isShow ? "취소" : "새 상품 추가")}
      </ViewToggle.Trigger>
      <ViewToggle.OnShow>
        <NewProductForm />
      </ViewToggle.OnShow>
    </ViewToggle>
  );
};
