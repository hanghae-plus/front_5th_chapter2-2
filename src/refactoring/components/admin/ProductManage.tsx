import { Product } from "../../../types";
import ProductList from "./ProductList";
import ProductAdd from "./ProductAdd";

const ProductManage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <ProductAdd />
      <ProductList />
    </div>
  );
};

export default ProductManage;
