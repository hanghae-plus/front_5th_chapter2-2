import { useCallback, useState } from "react";

import { CartPage } from "./pages/cart/CartPage";
import { AdminPage } from "./pages/admin/AdminPage";
import Nav from "./components/layouts/Nav";
import Layout from "./components/layouts/Layout";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const onToggleAdmin = useCallback(() => {
    setIsAdmin((prev) => !prev);
  }, []);

  return (
    <Layout>
      <Nav isAdmin={isAdmin} onToggleAdmin={onToggleAdmin} />

      <main className="container mx-auto mt-6">{isAdmin ? <AdminPage /> : <CartPage />}</main>
    </Layout>
  );
};

export default App;
