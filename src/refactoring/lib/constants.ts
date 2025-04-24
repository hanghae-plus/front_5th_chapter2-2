import { Coupon, Product } from '../../types';

export const INITIAL_NEW_PRODUCT: Omit<Product, 'id'> = {
  name: '',
  price: 0,
  stock: 0,
  discounts: [],
};

export const INITIAL_NEW_COUPON: Coupon = {
  name: '',
  code: '',
  discountType: 'percentage',
  discountValue: 0,
};
