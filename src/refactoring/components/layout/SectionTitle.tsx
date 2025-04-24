interface Props {
  sectionTitle: string;
}

export const SectionTitle = ({ sectionTitle }: Props) => {
  return <h2 className="text-2xl font-semibold mb-4">{sectionTitle}</h2>;
};
