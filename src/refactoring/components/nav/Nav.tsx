import { Typography } from "../common";

interface NavProps {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Nav = ({ isAdmin, setIsAdmin }: NavProps) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Typography variant="navHeader">쇼핑몰 관리 시스템</Typography>
        <button
          onClick={() => setIsAdmin((prev) => !prev)}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
        >
          {isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
        </button>
      </div>
    </nav>
  );
};
