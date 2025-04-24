import { Product } from "../../../../types";
import { useEditProductForm } from "../../../hooks/Admin/useEditProduct"
import { EditDiscountProduct } from "./EditDiscountProduct";
import { EditProductDiscountButton } from "./EditProductDiscountButton";

interface Props {
    product: Product,
    products: Product[],
    onProductUpdate: (updatedProduct: Product) => void;
}


export const EditProductForm = ({product, products, onProductUpdate}: Props) => {

    const { editingProduct, editProduct, editComplete, setEditingProduct, updateProductName, updateProductPrice, updateStock } = useEditProductForm();

    if(editingProduct && editingProduct.id === product.id){
 
        return (
            <div>
                <div className="InputForm">
                    <div className="mb-4">
                        <label className="block mb-1">상품명: </label>
                        <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => updateProductName(product.id, e.target.value)}
                        className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">가격: </label>
                        <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => updateProductPrice(product.id, parseInt(e.target.value))}
                        className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">재고: </label>
                        <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) => updateStock(product.id, parseInt(e.target.value), products, setEditingProduct)}
                        className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <EditDiscountProduct
                   editingProduct={editingProduct}
                   product={product}
                   products={products}
                   setEditingProduct={setEditingProduct}
                   onProductUpdate={onProductUpdate}
                />

                <button
                    onClick={() => editComplete(onProductUpdate)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                >
                수정 완료
                </button>
            </div>
        )
    }

    return (
        <EditProductDiscountButton 
            product={product} 
            editProduct={editProduct}
        />
    )
}