import CouponProvider from "#src/refactoring/providers/CouponProvider";
import ProductProvider from "#src/refactoring/providers/ProductProvider";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <CouponProvider>
      <ProductProvider>
        <div className="min-h-screen bg-gray-100">{children}</div>
      </ProductProvider>
    </CouponProvider>
  );
};

export default Layout;
