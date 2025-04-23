import { NavHeaderProps } from './NavHeader';

/**
 * todo
 * 토글도 나누기?
 *
 * isA: boolean
 * onToggle : () => void
 * toggleTexts : string[] // 배열 길이가 2 밖에 안되는데 이렇게 타입을 받는지 맞는가?
 *
 */
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
