import React, { useState } from 'react';

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  titleProps?: React.HTMLAttributes<HTMLDivElement>;
}

const Accordion = ({ title, children, titleProps }: AccordionProps) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <div onClick={handleToggle} {...titleProps}>
        {title}
      </div>
      {open && children}
    </>
  );
};

export default Accordion;
