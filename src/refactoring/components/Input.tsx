import React, { InputHTMLAttributes, useContext, createContext } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputContext = createContext<{ id?: string }>({});

export const Input = ({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) => {
  return (
    <InputContext.Provider value={{ id }}>
      <div className="mb-2">{children}</div>
    </InputContext.Provider>
  );
};

Input.Label = ({ children }: { children: React.ReactNode }) => {
  const { id } = useContext(InputContext);
  return (
    <label htmlFor={id} className="block mb-1">
      {children}
    </label>
  );
};

Input.Field = (props: InputProps) => {
  const { id } = useContext(InputContext);
  return (
    <input
      id={id}
      {...props}
      className={`w-full p-2 border rounded ${props.className ?? ""}`}
    />
  );
};
