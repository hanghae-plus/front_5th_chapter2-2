import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CouponProvider } from './context/CouponContext.tsx'
import { ProductProvider } from './context/ProductContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductProvider>
      <CouponProvider>
        <App />
      </CouponProvider>
    </ProductProvider>
  </React.StrictMode>,
)
