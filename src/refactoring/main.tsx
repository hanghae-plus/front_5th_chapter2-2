import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AdminProvider from "./context/AdminProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>
);
