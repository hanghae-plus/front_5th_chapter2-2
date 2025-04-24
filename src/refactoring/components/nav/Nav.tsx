import { Typography, Button } from "../common";

interface NavProps {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Nav = ({ isAdmin, setIsAdmin }: NavProps) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Typography variant="navHeader">쇼핑몰 관리 시스템</Typography>
        <Button
          onClick={() => setIsAdmin((prev) => !prev)}
          color="white"
          className="px-4 py-2"
        >
          {isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
        </Button>
      </div>
    </nav>
  );
};
