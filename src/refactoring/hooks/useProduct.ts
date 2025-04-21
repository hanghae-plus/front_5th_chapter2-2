import { useState } from 'react';
import { Product } from '../../types.ts';

export const useProducts = (initialProducts: Product[]) => {
    const [products, setProducts] = useState(initialProducts);

    const updateProduct = (product: Product) => {
        // TODO: error 핸들링
        if (!product) {
            return;
        }
        
        const newProducts = products.map((item) => {
            return item.id === product.id ? product : item;
        });

        setProducts(newProducts);
    };

    const addProduct = (product: Product) => {
        const newProducts = [...products, product];
        setProducts(newProducts);
    };

    return {
        products,
        updateProduct,
        addProduct,
    };
};
