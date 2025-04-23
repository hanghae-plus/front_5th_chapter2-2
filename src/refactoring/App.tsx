import Header from "./components/common/Header.tsx";
import Layout from "./components/common/Layout.tsx";
import Body from "./components/common/Body.tsx";
import { AdminProvider } from "./context/adminContext.tsx";

const App = () => {
  return (
    <Layout>
      <AdminProvider>
        <Header />
        <Body />
      </AdminProvider>
    </Layout>
  );
};

export default App;
