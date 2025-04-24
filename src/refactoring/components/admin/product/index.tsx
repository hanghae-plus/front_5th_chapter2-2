import { Product } from "../../../../types";
import AddProduct from "./add-product";
import ProductList from "./product-list";

interface Props {
    products: Product[];
    onProductUpdate: (updatedProduct: Product) => void;
    onProductAdd: (newProduct: Product) => void;
}

const ProductAdmin = ({ onProductAdd, products, onProductUpdate }: Props) => {

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
            <AddProduct onProductAdd={onProductAdd} />
            <ProductList products={products} onProductUpdate={onProductUpdate} />
        </div>
    )
}

export default ProductAdmin;