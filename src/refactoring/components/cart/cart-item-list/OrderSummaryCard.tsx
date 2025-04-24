import { Card } from "../../ui/Card.tsx";

type Props = {
  price: number;
  discountPrice: number;
  totalPrice: number;
};

export const OrderSummaryCard = ({
  price,
  discountPrice,
  totalPrice,
}: Props) => {
  return (
    <Card size="lg">
      <Card.Header className="text-2xl font-semibold mb-2">
        주문 요약
      </Card.Header>
      <Card.Content className="space-y-1">
        <p>상품 금액: {price.toLocaleString()}원</p>
        <p className="text-green-600">
          할인 금액: {discountPrice.toLocaleString()}원
        </p>
        <p className="text-xl font-bold">
          최종 결제 금액: {totalPrice.toLocaleString()}원
        </p>
      </Card.Content>
    </Card>
  );
};
