import { Outlet } from "react-router-dom";
import { useAdminCartToggle } from "../hooks/use-admin-cart-toggle";

export const RootLayout = () => {
  const { toggleText, handleToggleClick } = useAdminCartToggle();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
          <button
            onClick={handleToggleClick}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
          >
            {toggleText}
          </button>
        </div>
      </nav>
      <main className="container mx-auto mt-6">
        <Outlet />
      </main>
    </div>
  );
};
