import { useState } from "react";
import { Discount, Product } from "../../../../../types";
import { FieldValidator } from "../../../../../types";
import { checkCurrency } from "../../../../utils/checkCurrency";

type Props = {
    products: Product[];
    onProductUpdate: (updatedProduct: Product) => void;
}

export const useProductList = ({ products, onProductUpdate }: Props) => {
    const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

    const fieldValidator: Record<keyof Product, FieldValidator> = {
        price: (value) => typeof value === 'number' && checkCurrency(value),
        stock: (_) => true,
        name: (_) => true,
        discounts: (_) => true,
        id: (_) => true,
    }

    const fieldErrorMessages: Record<keyof Product, string> = {
        price: '가격은 100원 단위로 입력해야 합니다.',
        name: '상품 이름은 비워둘 수 없습니다.',
        stock: '재고는 0 이상이어야 합니다.',
        discounts: '할인 정보가 유효하지 않습니다.',
        id: '상품 ID는 비워둘 수 없습니다.',
      };

    const toggleProductAccordion = (productId: string) => {
        setOpenProductIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    };

    // handleEditProduct 함수 수정
    const handleEditProduct = (product: Product) => {
        setEditingProduct({ ...product });
    };

    const handleAllEdit = (field: keyof Product, value: string | number) => {
        console.log("수정할 필드:", field);
        const validator = fieldValidator[field];
        //개쩌넹
        if(!validator(value)) {
            alert(fieldErrorMessages[field]);
            return;
        }

        if (editingProduct) {
            setEditingProduct({
                ...editingProduct,
                [field]: value,
            });
        }
    };

    const handleEditComplete = () => {
        if (editingProduct) {
            console.log("수정 완료", editingProduct);
            onProductUpdate(editingProduct);
            setEditingProduct(null);
        }
    };

    const handleAddDiscount = (productId: string) => {
        const updatedProduct = products.find(p => p.id === productId);
        if (updatedProduct && editingProduct) {
            const newProduct = {
                ...updatedProduct,
                discounts: [...updatedProduct.discounts, newDiscount]
            };
            onProductUpdate(newProduct);
            setEditingProduct(newProduct);
            setNewDiscount({ quantity: 0, rate: 0 });
        }
    };

    const handleRemoveDiscount = (productId: string, index: number) => {
        const updatedProduct = products.find(p => p.id === productId);
        if (updatedProduct) {
            const newProduct = {
                ...updatedProduct,
                discounts: updatedProduct.discounts.filter((_, i) => i !== index)
            };
            onProductUpdate(newProduct);
            setEditingProduct(newProduct);
        }
    };

    return {
        openProductIds,
        toggleProductAccordion,
        handleEditProduct,
        handleAllEdit,
        handleEditComplete,
        handleAddDiscount,
        handleRemoveDiscount,
        editingProduct,
        newDiscount,
        setNewDiscount
    }
}