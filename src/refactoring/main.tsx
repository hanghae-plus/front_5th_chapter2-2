import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ProductsProvider } from './providers/ProductsProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>,
)
