import { ProductProvider } from '@/contexts/productContext.tsx';
import { CouponProvider } from '@/contexts/couponContext.tsx';

import Main from '@/pages/Main.tsx';

const App = () => {
  return (
    <ProductProvider>
      <CouponProvider>
        <Main />
      </CouponProvider>
    </ProductProvider>
  );
};

export default App;
