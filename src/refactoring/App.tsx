import { useState } from "react";
import { Layout } from "./components";
import CartPage from "./pages/cart";
import AdminPage from "./pages/admin";
import { Provider } from "jotai";
const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Provider>
      <Layout isAdmin={isAdmin} setIsAdmin={setIsAdmin}>
        {isAdmin ? <AdminPage /> : <CartPage />}
      </Layout>
    </Provider>
  );
};

export default App;
