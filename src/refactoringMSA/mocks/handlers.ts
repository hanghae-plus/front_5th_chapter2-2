import { http, HttpResponse } from 'msw';
import { Product } from '../../types';

const initialProducts: Product[] = [
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discounts: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
  },
  {
    id: 'p2',
    name: '상품2',
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: 'p3',
    name: '상품3',
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];
// interface PostRequest {
//   title: string;
// }

export const handlers = [
  // 상품 목록
  http.get('/products', () => {
    return HttpResponse.json(initialProducts);
  }),
  // 상품 수정
  http.put('/products/:id', ({ params }) => {
    const { id } = params;
    const product = initialProducts.find((p) => p.id === id);
    return HttpResponse.json(product);
  }),
  // 상품 추가
  http.post('/products', async ({ request }) => {
    const { data } = (await request.json()) as { data: Product };
    initialProducts.push(data);
    return HttpResponse.json({ data }, { status: 201 });
  }),

  // // 포스트 목록
  // http.get('/posts', () => {
  //   return HttpResponse.json(posts);
  // }),
  // // 포스트 추가
  // http.post('/posts', async ({ request }) => {
  //   const { title } = (await request.json()) as PostRequest;
  //   posts.push(title);
  //   return HttpResponse.json({ title }, { status: 201 });
  // }),
];
