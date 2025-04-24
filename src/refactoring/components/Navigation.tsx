interface NavigationButtonProps {
  isAdmin: boolean;
  onClick: () => void;
  toCartText: string;
  toAdminText: string;
}

export const NavigationButton = ({
  isAdmin,
  onClick,
  toCartText,
  toAdminText,
}: NavigationButtonProps) => (
  <button
    onClick={onClick}
    className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
  >
    {isAdmin ? toCartText : toAdminText}
  </button>
);

interface NavigationTitleProps {
  title: string;
}

export const NavigationTitle = ({ title }: NavigationTitleProps) => (
  <h1 className="text-2xl font-bold">{title}</h1>
);

interface NavigationProps {
  isAdmin: boolean;
  onToggleAdmin: () => void;
  title: string;
  toCartText: string;
  toAdminText: string;
}

export const Navigation = ({
  isAdmin,
  onToggleAdmin,
  title,
  toCartText,
  toAdminText,
}: NavigationProps) => (
  <nav className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <NavigationTitle title={title} />
      <NavigationButton
        isAdmin={isAdmin}
        onClick={onToggleAdmin}
        toCartText={toCartText}
        toAdminText={toAdminText}
      />
    </div>
  </nav>
);
