import { useAtom } from "jotai";

import { Product, ProductFormData, Discount } from "../../../6_shared/types";
import { productsAtom } from "../../../5_entities/product/model/atoms";
import * as ProductModel from "../../../5_entities/product/lib";

// 관리자 페이지 - 상품관리에 필요한 기능들
export const useProducts = () => {
  const [products, setProducts] = useAtom(productsAtom);

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) => ProductModel.updateProduct(prev, updatedProduct));
  };

  const addProduct = (newProduct: ProductFormData) => {
    const newProductWithId = {
      ...newProduct,
      id: Date.now().toString(),
    };
    setProducts((prev) => ProductModel.addProduct(prev, newProductWithId));
  };

  const addDiscount = (productId: string, discount: Discount) => {
    const existingProduct = ProductModel.findProduct(products, productId);

    if (!existingProduct) return;

    const updatedProduct = ProductModel.addDiscount(existingProduct, discount);

    updateProduct(updatedProduct);
  };

  const removeDiscount = (productId: string, discountIndex: number) => {
    const existingProduct = ProductModel.findProduct(products, productId);

    if (!existingProduct) return;

    const updatedProduct = ProductModel.removeDiscount(
      existingProduct,
      discountIndex
    );

    updateProduct(updatedProduct);
  };

  return {
    products,
    updateProduct,
    addProduct,
    addDiscount,
    removeDiscount,
  };
};
