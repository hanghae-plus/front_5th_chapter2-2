import ProductItem from "./ProductItem";

const ProductList = () => {
  return (
    <div className="space-y-2">
      {products.map((product) => (
        <ProductItem />
      ))}
    </div>
  );
};

export default ProductList;
