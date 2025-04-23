export const PRODUCT_FORM_FIELDS = [
  { id: 'productName', label: '상품명', type: 'text', key: 'name' },
  { id: 'productPrice', label: '가격', type: 'number', key: 'price' },
  { id: 'productStock', label: '재고', type: 'number', key: 'stock' },
] as const;
