
import { Product } from "../../../../types";
import { useToggle } from "../../../hooks/Admin/useToggle"
import { EditProductForm } from "./EditProductForm"
import { ProductItemToggle } from "./ProductItemToggle"

interface Props{
  products: Product[],
  onProductUpdate: (updatedProduct: Product) => void;
}

export const ProductList = ({onProductUpdate, products}: Props) => {
    const {openProductIds, toggleProductAccordion} = useToggle();


    return(
      <div className="space-y-2">
        {products.map((product, index) => (
          <div key={product.id} 
                data-testid={`product-${index + 1}`} 
                className="bg-white p-4 rounded shadow"
          >
            
            <ProductItemToggle 
              product = {product}
              toggleProductAccordion = {toggleProductAccordion}
            />

            {openProductIds.has(product.id) && (
              <div className="mt-2">
                <EditProductForm 
                  product={product} 
                  products={products}
                  onProductUpdate={onProductUpdate}/>
              </div>
            )}
          </div>
        ))}
      </div>
    )
}