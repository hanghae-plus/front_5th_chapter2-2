import React from 'react';

/**
 * 카드 컴포넌트
 * @param children 카드 내용
 * @returns 카드 컴포넌트
 */
const Card = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  props?: React.ComponentProps<'div'>;
}) => (
  <div className="bg-white p-4 rounded shadow" {...props}>
    {children}
  </div>
);

export default Card;
