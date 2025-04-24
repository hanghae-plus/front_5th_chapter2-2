import { Button } from "../../common";
import { useProductManagement } from "../../../contexts/ProductManagementContext";
import { CreateProductForm } from "./CreateProductForm";

export const CreateProductFormSection = () => {
  const { showNewProductForm, setShowNewProductForm } = useProductManagement();

  return (
    <>
      <Button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        color="green"
        className="px-4 py-2 mb-4"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </Button>
      <CreateProductForm />
    </>
  );
};
