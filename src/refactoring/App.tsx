import { AdminPage } from "@/refactoring/components/AdminPage";
import { CartPage } from "@/refactoring/components/CartPage";
import { useService } from "@/refactoring/hooks";
import { PERMISSION_TYPE } from "@/types";
import { Providers } from "./provider";

// 서버에서 사용자에게 관리자 권한이 있는 지를 더미 테스트
const SERVER_USER_PERMISSION = PERMISSION_TYPE.ADMIN;

const App = () => {
  const { isAdminView, toggleService } = useService(SERVER_USER_PERMISSION);

  return (
    <Providers>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
            <button onClick={toggleService} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
              {isAdminView ? "장바구니 페이지로" : "관리자 페이지로"}
            </button>
          </div>
        </nav>
        <main className="container mx-auto mt-6">{isAdminView ? <AdminPage /> : <CartPage />}</main>
      </div>
    </Providers>
  );
};

export default App;
