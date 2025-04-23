import { Product } from '../../../types';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export const ProductList = ({ products, onEdit, onDelete }: ProductListProps) => (
  <div>
    <h3 className="text-xl font-bold mb-4">상품 목록</h3>
    <div className="space-y-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  </div>
);

interface ProductItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductItem = ({ product, onEdit, onDelete }: ProductItemProps) => (
  <div className="border p-4 rounded shadow">
    <div className="flex justify-between items-center">
      <div>
        <h4 className="text-lg font-semibold">{product.name}</h4>
        <p>가격: {product.price}원</p>
        <p>재고: {product.stock}개</p>
        {product.discounts.length > 0 && (
          <DiscountList discounts={product.discounts} />
        )}
      </div>
      <ProductActions
        product={product}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  </div>
);

interface DiscountListProps {
  discounts: Product['discounts'];
}

const DiscountList = ({ discounts }: DiscountListProps) => (
  <div className="mt-2">
    <p className="font-medium">할인 정보:</p>
    <ul className="list-disc list-inside">
      {discounts.map((discount, index) => (
        <li key={index}>
          {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
        </li>
      ))}
    </ul>
  </div>
);

interface ProductActionsProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductActions = ({ product, onEdit, onDelete }: ProductActionsProps) => (
  <div className="flex space-x-2">
    <button
      onClick={() => onEdit(product)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      수정
    </button>
    <button
      onClick={() => onDelete(product.id)}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      삭제
    </button>
  </div>
); 