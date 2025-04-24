export const H1 = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-3xl font-bold mb-6">{children}</h1>;
};

export const H2 = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-2xl font-semibold mb-4">{children}</h2>;
};

export const H3 = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-lg font-semibold mb-2">{children}</h3>;
};

export const H4 = ({ children }: { children: React.ReactNode }) => {
  return <h4 className="text-base font-semibold mb-2">{children}</h4>;
};
