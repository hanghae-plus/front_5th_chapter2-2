import {useState} from 'react';
import {CartPage} from './components/CartPage.tsx';
import {AdminPage} from './components/AdminPage.tsx';
import {Header} from './components/Header.tsx';
import {useCoupons, useProducts} from "./hooks";

const App = () => {
  const { products, updateProduct, addProduct } = useProducts();
  const { coupons, addCoupon } = useCoupons();
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
        <Header onClick={() => setIsAdmin(!isAdmin)} admin={isAdmin}/>
        <main className="container mx-auto mt-6">
            {isAdmin ? (
                <AdminPage
                    products={products}
                    coupons={coupons}
                    onProductUpdate={updateProduct}
                    onProductAdd={addProduct}
                    onCouponAdd={addCoupon}
                />
            ) : (
                <CartPage products={products} coupons={coupons}/>
            )}
        </main>
    </div>
  );
};

export default App;
