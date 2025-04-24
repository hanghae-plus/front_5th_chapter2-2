import { CartItem } from "../../../../types";
import { useLocalStorageContext } from "../../../context";

type Props = {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
    cart: CartItem[];
}

const OrderSummary = ({ totalAfterDiscount, totalBeforeDiscount, totalDiscount, cart }: Props) => {
    const { setValue, removeValue } = useLocalStorageContext();
    console.log('장바구니:', cart);

    //저장과 삭제 함수

    return (
        <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
            <div className="space-y-1">
                <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
                <p className="text-green-600">할인 금액: {totalDiscount.toLocaleString()}원</p>
                <p className="text-xl font-bold">
                    최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
                </p>
                <div className="flex  mt-4">
                    <div className="bg-blue-500" id="local-save" onClick={() => setValue(cart)}>저장</div>
                    <div className="ml-4 bg-red-500" data-testid="local-remove" onClick={removeValue}>삭제</div>
                </div>
            </div>

        </div>
    )
}

export default OrderSummary;