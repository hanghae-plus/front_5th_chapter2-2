import { createHashRouter } from "react-router-dom";

import { RootLayout } from "../../3_widgets/layouts";
import { CartPage } from "../../2_pages/cart";
import { AdminPage } from "../../2_pages/admin";

export const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <CartPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "admin", element: <AdminPage /> },
    ],
  },
]);
