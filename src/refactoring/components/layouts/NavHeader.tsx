import TogglePageButton from './TogglePageButton';

export type NavHeaderProps = {
  isAdmin: boolean;
  onToggle: () => void;
};

const NavHeader = ({ isAdmin, onToggle }: NavHeaderProps) => {
  return (
    <div className="container mx-auto flex justify-between items-center">
      <Title title={'쇼핑몰 관리 시스템'} />
      <TogglePageButton isAdmin={isAdmin} onToggle={onToggle} />
    </div>
  );
};
const Title = ({ title }: { title: string }) => {
  return <h1 className="text-2xl font-bold">{title}</h1>;
};

export default NavHeader;
