interface Props {
  menu: string;
}
export const TitleMenu = ({ menu }: Props) => {
  const titleMenu: string = menu === "cart" ? "장바구니" : "관리자 페이지";
  return <h1 className="text-3xl font-bold mb-6">{titleMenu}</h1>;
};
