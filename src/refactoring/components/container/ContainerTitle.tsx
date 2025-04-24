interface PropsType {
  title: string;
  mb?: string;
}

const ContainerTitle = ({ title, mb }: PropsType) => {
  return <h2 className={`text-2xl font-semibold mb-${mb}`}>{title}</h2>;
};

export default ContainerTitle;
