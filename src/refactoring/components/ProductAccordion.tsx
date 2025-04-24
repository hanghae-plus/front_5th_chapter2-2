import { PropsWithChildren } from 'react';
import { useProductAccordion } from '../hooks/useProductAccordion';

interface Props {
  id: string;
  title: string;
}
export default function ProductAccordion({
  id,
  title,
  children,
}: PropsWithChildren<Props>) {
  const { openProductIds, toggleProductAccordion } = useProductAccordion();

  return (
    <>
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(id)}
        className="w-full text-left font-semibold"
      >
        {title}
      </button>
      {openProductIds.has(id) && <div className="mt-2">{children}</div>}
    </>
  );
}
