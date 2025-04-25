import { useLocation, useNavigate } from "react-router-dom";

// 장바구니 <-> 관리자 페이지 토글 hook
export const useAdminCartToggle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPage = location.pathname === "/admin";
  const togglePath = isAdminPage ? "/cart" : "/admin";
  const toggleText = isAdminPage ? "장바구니 페이지로" : "관리자 페이지로";

  const handleToggleClick = () => {
    navigate(togglePath);
  };

  return {
    isAdminPage,
    toggleText,
    handleToggleClick,
  };
};
