import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
    const [products, setProducts] = useState(initialProducts);

    // 제품 업데이트 함수 구현 (id로 찾아서 변경)
    const updateProduct = (updatedProduct: Product) => {
        // 여기서 제품 ID로 찾아서 업데이트하는 로직 구현
        // setProducts를 사용하여 상태 업데이트
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id
                    ? { ...product, ...updatedProduct }
                    : product
            )
        );
    };

    // 제품 추가 함수 구현
    const addProduct = (newProduct: Product) => {
        // 새 제품을 배열에 추가하는 로직 구현
        // setProducts를 사용하여 상태 업데이트]
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        console.log(products);
    };

    return {
        products,
        updateProduct,
        addProduct,
    };
};
