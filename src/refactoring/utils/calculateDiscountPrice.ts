import { Coupon } from '../../types'

interface Props {
	coupon: Coupon | null
	originalPrice: number
}

function calculateDiscountPrice({ coupon, originalPrice }: Props) {
	if (!coupon) return originalPrice

	switch(coupon.discountType) {
		case 'amount':
			return originalPrice - coupon.discountValue
		case 'percentage':
			return originalPrice * (1 - coupon.discountValue / 100)
		default:
			return originalPrice
	}
}

export default calculateDiscountPrice