// widgets/CartItem/ui
import { CartItem } from "../../../types.ts"
import { getAppliedDiscount } from "../../models/cart.ts"
import Button from "../ui/Button.tsx"
import { useCartContext } from "../../context/CartContext.tsx"
import { formatPercentage } from "../../utils"

export default function CartLineItem({ item }: { item: CartItem }) {
  const { removeFromCart, updateQuantity } = useCartContext()
  const appliedDiscount = getAppliedDiscount(item)

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
      <div>
        <span className="font-semibold">{item.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {item.product.price}원 x {item.quantity}
          {appliedDiscount > 0 && (
            <span className="text-green-600 ml-1">({formatPercentage(appliedDiscount)} 할인 적용)</span>
          )}
        </span>
      </div>

      <div>
        <Button
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
          -
        </Button>
        <Button
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
          +
        </Button>
        <Button
          onClick={() => removeFromCart(item.product.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          삭제
        </Button>
      </div>
    </div>
  )
}
