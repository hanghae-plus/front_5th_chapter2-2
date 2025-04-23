import { NavHeaderProps } from './NavHeader';

const TogglePageButton = ({ isAdmin, onToggle }: NavHeaderProps) => {
  return (
    <button
      onClick={onToggle}
      className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
      {isAdmin ? '장바구니 페이지로' : '관리자 페이지로'}
    </button>
  );
};

export default TogglePageButton;
