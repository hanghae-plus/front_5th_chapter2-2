import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ProductsProvider, initialProducts } from "./providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductsProvider initialProducts={initialProducts}>
      <App />
    </ProductsProvider>
  </React.StrictMode>
);
