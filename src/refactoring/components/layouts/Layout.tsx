import CouponsProvider from "#src/refactoring/providers/CouponsProvider";
import ProductsProvider from "#src/refactoring/providers/ProductsProvider";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <CouponsProvider>
      <ProductsProvider>
        <div className="min-h-screen bg-gray-100">{children}</div>
      </ProductsProvider>
    </CouponsProvider>
  );
};

export default Layout;
