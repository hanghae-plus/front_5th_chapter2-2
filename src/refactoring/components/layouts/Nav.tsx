import React from "react";

interface IProps {
  isAdmin: boolean;
  onToggleAdmin: () => void;
}
const Nav: React.FC<IProps> = ({ isAdmin, onToggleAdmin }) => {
  const handleResetLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
        <button
          onClick={handleResetLocalStorage}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
        >
          로컬스토리지 초기화
        </button>
        <button onClick={onToggleAdmin} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
          {isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
        </button>
      </div>
    </nav>
  );
};

export default React.memo(Nav);
