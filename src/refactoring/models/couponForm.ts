import { Coupon } from "../../types"

export const updateCoupon = (coupon: Coupon, updateInfo: {key: keyof Coupon, value: Coupon[keyof Coupon]}): Coupon => {
  return {
    ...coupon,
    [updateInfo.key]: updateInfo.value
  }
}

export const createDefaultCoupon = (): Coupon => {
  return {
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0
  }
}
