type RemoveButtonProps = {
  onClick: () => void;
};

export const RemoveButton = ({ onClick }: RemoveButtonProps) => (
  <button onClick={onClick} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
    삭제
  </button>
);
